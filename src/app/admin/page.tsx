import { AdminDashboard } from '@/features/admin/AdminDashboard';
import { Lock } from 'lucide-react';

export const metadata = {
  title: 'Панель управления CMS | Green Project Armenia',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return (
    <div className="py-12 bg-limestone-alt min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-graphite-900 tracking-tight">
              Система управления инвентарем (CMS)
            </h1>
            <p className="text-xs text-graphite-500 mt-1">
              Управление статусами квартир, ценами и входящими заявками отдела продаж
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-graphite-500">
            <Lock className="w-3.5 h-3.5 text-brass" />
            <span>Защищенная панель</span>
          </div>
        </div>

        <AdminDashboard />
      </div>
    </div>
  );
}
