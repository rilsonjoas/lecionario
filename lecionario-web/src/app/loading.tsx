export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <img
          src="/icons/icon-192x192.png"
          alt="Lecionário"
          width={96}
          height={96}
          className="w-24 h-24 mx-auto rounded-2xl bg-creme p-3 shadow-xl"
        />
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-secondary font-display text-xl">Carregando...</p>
      </div>
    </div>
  );
}
