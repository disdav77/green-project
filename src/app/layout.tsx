import type { Metadata } from 'next';
import './globals.css';
import './style.css';
import { AppProvider } from '@/context/AppContext';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/layout/ConsultationModal';

export const metadata: Metadata = {
  title: 'Green Project | Премиальный девелопмент в Ереване и Касахе',
  description: 'Архитектурный девелопер в Армении. ЖК Green Avan, ЖК Green Nork и Green Townhouse. Сейсмостойкость 9 баллов, монолит B25/B30, возврат налога по Ст. 156.1 НК РА.',
  keywords: ['недвижимость Ереван', 'квартиры в Ереване', 'Green Project', 'Green Avan', 'Green Nork', 'Green Townhouse', 'возврат подоходного налога', 'ипотека Армения'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-white text-graphite-900">
        <AppProvider>
          <TopBar />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ConsultationModal />
        </AppProvider>
      </body>
    </html>
  );
}
