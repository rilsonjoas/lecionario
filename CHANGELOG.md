# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-28

### Added

- Projeto inicial — monorepo com `lecionario-web` (Next.js 14 PWA) e `lecionario-mobile` (Expo/React Native).
- Motor de calendário litúrgico completo com cálculo de estações, cores e ciclos RCL (A/B/C).
- Sistema de temas sazonais com variáveis CSS por estação litúrgica.
- 49 componentes shadcn/ui + componentes devocionais (ReadingCard, PrayerSection, MeditationSection, CollectSection).
- Painel admin com autenticação passwordless, editor de devocionais e integração LectServe.
- Integração Supabase com tipos TypeScript completos para 5 tabelas.
- 18 scripts de importação de dados (BCP collects, lecionário, meditações, orações).
- Aplicativo mobile funcional com leitura de dados do Supabase.
- PWA completo com manifest, ícones, screenshots e Service Worker.
- Configuração de ESLint com TypeScript strict mode.
- Fonte Cormorant Garamond, EB Garamond e JetBrains Mono (auto-hospedadas, WOFF2 variável).
