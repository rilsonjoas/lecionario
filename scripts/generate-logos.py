#!/usr/bin/env python3
"""
Gera todos os assets de marca do Lecionário a partir de Logo.png.

Recolora o símbolo (camadas violeta e dourado) para cada estação litúrgica e
produz: ícones PWA (web), manifests sazonais, favicon e os assets nativos
(Expo + Android res).

Uso:
    python3 scripts/generate-logos.py
"""
from __future__ import annotations

import json
import os
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "Logo.png"
WEB_ICONS = ROOT / "lecionario-web" / "public" / "icons"
WEB_PUBLIC = ROOT / "lecionario-web" / "public"
MOBILE_ASSETS = ROOT / "lecionario-mobile" / "assets"
ANDROID_RES = ROOT / "lecionario-mobile" / "android" / "app" / "src" / "main" / "res"

CREME = (245, 241, 232)  # --creme / #F5F1E8
BEIGE = (234, 224, 213)  # --bege-areia / #EAE0D5

# Camadas de referência da logo original (violeta do corpo e dourado da chama)
REF_VIOLET = (64, 16, 144)
REF_GOLD = (176, 128, 16)

# Paleta unificada (2026-08-15) — alinhada aos tokens do Design Narniano
# e às cores litúrgicas reais (Advento = azul Sarum, não roxo/rosa).
# (corpo, chama) — chama fica dourada/clara na maioria das estações de
# propósito (a Palavra continua acesa); só muda de sentido na Quaresma
# (cinza, quase se apagando) e no Pentecostes (fogo — Atos 2). Web e
# mobile usam os mesmos valores agora; antes divergiam (ex. Quaresma).
WEB_PALETTE = {
    "advent": ("#4A6FA5", "#B49A60"),
    "christmas": ("#B49A60", "#F4EFE1"),
    "epiphany": ("#7A9178", "#B49A60"),
    "lent": ("#4B2E39", "#8B9094"),
    "easter": ("#B49A60", "#F4EFE1"),
    "pentecost": ("#B7332B", "#C26430"),
    "ordinary": ("#7A9178", "#B49A60"),
}

MOBILE_PALETTE = dict(WEB_PALETTE)

SEASONS = list(WEB_PALETTE)

# Densidades Android (ic_launcher): 48/72/96/144/192 px
ANDROID_DENSITIES = [
    ("mdpi", 48, 108),
    ("hdpi", 72, 162),
    ("xhdpi", 96, 216),
    ("xxhdpi", 144, 324),
    ("xxxhdpi", 192, 432),
]
# Splash (drawable-*): 288/432/576/864/1152 px
SPLASH_DENSITIES = [
    ("mdpi", 288),
    ("hdpi", 432),
    ("xhdpi", 576),
    ("xxhdpi", 864),
    ("xxxhdpi", 1152),
]

WEB_SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512]


def luminance(rgb: tuple[int, int, int]) -> float:
    r, g, b = (c / 255.0 for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def classify(pix: tuple[int, int, int]) -> str:
    dr = sum((p - r) ** 2 for p, r in zip(pix, REF_VIOLET))
    dg = sum((p - r) ** 2 for p, r in zip(pix, REF_GOLD))
    return "gold" if dg < dr else "violet"


def recolor(src: Image.Image, body: str, flame: str) -> Image.Image:
    """Recolore corpo->body e chama->flame preservando o sombreamento da logo."""
    body_rgb = tuple(int(body[i : i + 2], 16) for i in (1, 3, 5))
    flame_rgb = tuple(int(flame[i : i + 2], 16) for i in (1, 3, 5))
    ref_lum = {"violet": luminance(REF_VIOLET), "gold": luminance(REF_GOLD)}
    targets = {"violet": body_rgb, "gold": flame_rgb}

    src = src.convert("RGBA")
    px = src.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            layer = classify((r, g, b))
            lum = luminance((r, g, b))
            factor = max(0.3, min(1.9, lum / ref_lum[layer]))
            target = targets[layer]
            nr = min(255, round(target[0] * factor))
            ng = min(255, round(target[1] * factor))
            nb = min(255, round(target[2] * factor))
            px[x, y] = (nr, ng, nb, a)
    return src


def crop_symbol(img: Image.Image, pad: int = 8) -> Image.Image:
    """Recorta a silhueta da logo e centraliza com uma margem proporcional."""
    alpha = img.split()[3]
    bbox = alpha.getbbox()
    if not bbox:
        return img
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad)
    bottom = min(img.height, bottom + pad)
    return img.crop((left, top, right, bottom))


def center_on_canvas(symbol: Image.Image, size: int, fill_ratio: float) -> Image.Image:
    """Centraliza o símbolo num canvas quadrado ocupando `fill_ratio` do lado."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    target = int(size * fill_ratio)
    sym = ImageOps.fit(symbol, (target, target), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    canvas.paste(sym, ((size - target) // 2, (size - target) // 2), sym)
    return canvas


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG")
    print(f"  ok {path.relative_to(ROOT)}")


def save_webp(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="WEBP", quality=90, method=6)
    print(f"  ok {path.relative_to(ROOT)}")


def manifest_for(season: str, body: str) -> dict:
    m = json.loads((WEB_PUBLIC / "manifest.json").read_text())
    m["theme_color"] = body
    return m


def main() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    symbol = crop_symbol(logo)

    # ---------- Web: ícones padrão (logo original) ----------
    print("== web icons ==")
    for size in WEB_SIZES:
        save_png(center_on_canvas(symbol, size, 0.92), WEB_ICONS / f"icon-{size}x{size}.png")

    # ---------- Web: favicon ----------
    print("== favicon ==")
    for size in (32, 48):
        save_png(center_on_canvas(symbol, size, 0.9), WEB_ICONS / f"icon-{size}x{size}.png")
    ico = Image.new("RGBA", (48, 48), (0, 0, 0, 0))
    ico.paste(center_on_canvas(symbol, 48, 0.9), (0, 0), center_on_canvas(symbol, 48, 0.9))
    ico.save(WEB_PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  ok favicon.ico")

    # ---------- Web: máscaras (fundo creme, símbolo na zona segura) ----------
    print("== maskable icons ==")
    for size in WEB_SIZES:
        canvas = Image.new("RGBA", (size, size), CREME + (255,))
        sym = center_on_canvas(symbol, size, 0.62)
        canvas.alpha_composite(sym)
        save_png(canvas, WEB_ICONS / f"maskable-{size}x{size}.png")

    # ---------- Web: logos sazonais + manifests ----------
    print("== season logos (web) ==")
    season_dir = WEB_ICONS / "logo"
    for season in SEASONS:
        body, flame = WEB_PALETTE[season]
        rec = recolor(logo, body, flame)
        save_png(center_on_canvas(crop_symbol(rec), 512, 0.92), season_dir / f"season-{season}.png")
        (WEB_PUBLIC / f"manifest-{season}.json").write_text(
            json.dumps(manifest_for(season, body), ensure_ascii=False, indent=2)
        )
        print(f"  ok manifest-{season}.json")

    # ---------- Mobile: assets Expo ----------
    print("== mobile expo assets ==")
    icon_1024 = Image.new("RGBA", (1024, 1024), CREME + (255,))
    icon_1024.alpha_composite(center_on_canvas(symbol, 1024, 0.64))
    save_png(icon_1024, MOBILE_ASSETS / "icon.png")

    save_png(center_on_canvas(symbol, 1024, 0.52), MOBILE_ASSETS / "adaptive-icon.png")
    save_png(center_on_canvas(symbol, 1024, 0.5), MOBILE_ASSETS / "splash-icon.png")
    save_png(center_on_canvas(symbol, 48, 0.9), MOBILE_ASSETS / "favicon.png")

    print("== mobile season logos ==")
    for season in SEASONS:
        body, flame = MOBILE_PALETTE[season]
        rec = recolor(logo, body, flame)
        save_png(center_on_canvas(crop_symbol(rec), 256, 0.92), MOBILE_ASSETS / "logo" / f"season-{season}.png")

    # ---------- Mobile: Android res ----------
    print("== android res ==")
    for density, size, fg_size in ANDROID_DENSITIES:
        mipmap = ANDROID_RES / f"mipmap-{density}"
        canvas = Image.new("RGBA", (size, size), CREME + (255,))
        canvas.alpha_composite(center_on_canvas(symbol, size, 0.72))
        save_webp(canvas, mipmap / "ic_launcher.webp")
        save_webp(canvas, mipmap / "ic_launcher_round.webp")
        fg = center_on_canvas(symbol, fg_size, 0.54)
        save_webp(fg, mipmap / "ic_launcher_foreground.webp")

    for density, size in SPLASH_DENSITIES:
        drawable = ANDROID_RES / f"drawable-{density}"
        save_png(center_on_canvas(symbol, size, 0.6), drawable / "splashscreen_logo.png")

    print("done.")


if __name__ == "__main__":
    main()
