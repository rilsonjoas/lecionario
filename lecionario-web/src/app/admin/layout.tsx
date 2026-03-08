import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Lecionário',
  description: 'Painel administrativo do Lecionário. Gerencie leituras, orações e devocionais.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
