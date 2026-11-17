import React from 'react';
import { ASSETS } from '../data/hrisData';
import { ScreenId } from '../types';
import { SafeImage } from './SafeImage';

interface LayoutShellProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  pendingApprovalsCount: number;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  children: React.ReactNode;
}

const SCREEN_TITLES: Record<ScreenId, string> = {
  beranda: 'Beranda',
  absensi: 'Absensi',
  pengajuan: 'Pengajuan',
  dokumen: 'Dokumen & Slip',
  profil: 'Profil Saya',
  manager: 'Tim & Manager',
};

const DESKTOP_NAV: { id: ScreenId; label: string; icon: string; badge?: 'approvals' }[] = [
  { id: 'beranda', label: 'Beranda', icon: 'home' },
  { id: 'absensi', label: 'Absensi', icon: 'fingerprint' },
  { id: 'pengajuan', label: 'Pengajuan', icon: 'post_add' },
  { id: 'dokumen', label: 'Dokumen & Slip', icon: 'folder_shared' },
  { id: 'profil', label: 'Profil Saya', icon: 'badge' },
  { id: 'manager', label: 'Tim & Manager', icon: 'shield_person', badge: 'approvals' },
];

const MOBILE_TABS: { id: ScreenId; label: string; icon: string; badge?: 'approvals' }[] = [
  { id: 'beranda', label: 'Beranda', icon: 'home' },
  { id: 'absensi', label: 'Absensi', icon: 'schedule' },
  { id: 'pengajuan', label: 'Pengajuan', icon: 'assignment_turned_in', badge: 'approvals' },
  { id: 'dokumen', label: 'Dokumen', icon: 'folder_shared' },
  { id: 'profil', label: 'Profil', icon: 'badge' },
];

export const LayoutShell: React.FC<LayoutShellProps> = ({
  activeScreen,
  onNavigate,
  pendingApprovalsCount,
  unreadNotificationsCount,
  onOpenNotifications,
  children,
}) => {
  const isProfileOrManager = activeScreen === 'profil' || activeScreen === 'manager';

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#191c1e] flex flex-col lg:flex-row">
      {/* Desktop Permanent Left Sidebar (260px) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:fixed lg:inset-y-0 lg:left-0 bg-white border-r border-[#e8ebf0] z-40">
        <div className="h-16 px-5 flex items-center gap-3 border-b border-[#e8ebf0]">
          <SafeImage
            src={ASSETS.logoPrimary}
            alt="ARIFINDOne Logo"
            className="h-8 w-8 object-contain rounded-md"
            fallbackIcon="corporate_fare"
            fallbackClassName="h-8 w-8 rounded-md bg-[#c8102e] text-white"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-[17px] font-extrabold text-[#9e001f] tracking-tight leading-none">
                ARIFINDOne
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#0d1c2f] text-[10px] font-semibold leading-none">
                Manager
              </span>
            </div>
            <span className="text-[11px] text-[#515f74] mt-1 truncate">
              PT Arifindo Adiputra Ariaguna
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto" aria-label="Navigasi Utama">
          <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
            Menu ESS & Operasional
          </p>
          {DESKTOP_NAV.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl flex items-center justify-between text-[14px] transition-colors ${
                  isActive
                    ? 'bg-[#fdeef0] text-[#c8102e] font-semibold'
                    : 'text-[#475569] hover:bg-[#f3f5f8] hover:text-[#191c1e] font-medium'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'fill-icon text-[#c8102e]' : 'text-[#515f74]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>
                {item.badge === 'approvals' && pendingApprovalsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#c8102e] text-white text-[11px] font-bold tabular-nums">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#e8ebf0]">
          <button
            type="button"
            onClick={() => onNavigate('profil')}
            className="w-full p-2.5 rounded-xl bg-[#f8f9fb] hover:bg-[#f2f4f6] border border-[#e8ebf0] flex items-center gap-2.5 text-left transition-colors"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#edeef0]">
              <SafeImage
                src={ASSETS.profilePortrait}
                alt="Bayu Pratama"
                className="w-full h-full object-cover"
                fallbackIcon="person"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-[#191c1e] truncate">
                Bayu Pratama, S.T.
              </p>
              <p className="text-[11px] text-[#515f74] truncate">
                Site Lead • ARF-2019-082
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Top Header (< 1024px) */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 bg-[#f8f9fb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] border-b border-[#e8ebf0]/80 pt-safe">
        <div className="h-16 px-4 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('beranda')}
              className="flex items-center gap-2.5 text-left min-w-0"
            >
              <SafeImage
                src={ASSETS.logoPrimary}
                alt="logo-arifindo.png"
                className="h-8 w-8 object-contain shrink-0"
                fallbackIcon="corporate_fare"
                fallbackClassName="h-8 w-8 rounded-lg bg-[#c8102e] text-white"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-[16px] font-bold text-[#9e001f] tracking-tight leading-none whitespace-nowrap">
                    ARIFINDOne
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(activeScreen === 'manager' ? 'profil' : 'manager');
                    }}
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-tight cursor-pointer transition-colors ${
                      activeScreen === 'manager'
                        ? 'bg-[#c8102e] text-white'
                        : 'bg-[#d5e3fd] text-[#0d1c2f]'
                    }`}
                  >
                    Manager
                  </span>
                </div>
                <span className="text-[11px] text-[#515f74] mt-0.5 truncate">
                  {SCREEN_TITLES[activeScreen]}
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label="Persetujuan Tertunda & Notifikasi"
              className="relative w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#515f74] hover:text-[#191c1e] hover:bg-[#e7e8ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {(unreadNotificationsCount > 0 || pendingApprovalsCount > 0) && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#c8102e] ring-2 ring-[#f8f9fb]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onNavigate(activeScreen === 'profil' ? 'manager' : 'profil')}
              aria-label="Buka Profil Tim & Manajer"
              className={`w-9 h-9 min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center shadow-sm transition-all ${
                isProfileOrManager
                  ? 'bg-[#9e001f] text-white ring-2 ring-[#9e001f]/25'
                  : 'bg-[#c8102e] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {activeScreen === 'manager' ? 'shield_person' : 'person'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen">
        {/* Desktop Top Utility Bar */}
        <header className="hidden lg:flex sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-[#e8ebf0] px-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-[18px] font-bold text-[#191c1e]">
              {SCREEN_TITLES[activeScreen]}
            </h1>
            <span className="text-[12px] text-[#64748b]">·</span>
            <span className="text-[13px] text-[#515f74]">
              Proyek Grand Arifindo Sidoarjo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate(activeScreen === 'manager' ? 'profil' : 'manager')}
              className={`h-10 px-3.5 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 border transition-colors ${
                activeScreen === 'manager'
                  ? 'bg-[#c8102e] text-white border-[#c8102e]'
                  : 'bg-white text-[#334155] border-[#e8ebf0] hover:bg-[#f3f5f8]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">shield_person</span>
              <span>Mode Manager</span>
              {pendingApprovalsCount > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold tabular-nums ${
                    activeScreen === 'manager'
                      ? 'bg-white text-[#c8102e]'
                      : 'bg-[#fdeef0] text-[#c8102e]'
                  }`}
                >
                  {pendingApprovalsCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label="Notifikasi"
              className="relative w-10 h-10 rounded-lg border border-[#e8ebf0] bg-white hover:bg-[#f3f5f8] flex items-center justify-center text-[#515f74] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c8102e]" />
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 w-full pt-16 pb-24 lg:pt-6 lg:pb-10 px-4 lg:px-6 max-w-[460px] sm:max-w-xl lg:max-w-6xl mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Fixed Bottom Tab Bar (< 1024px) */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f8f9fb]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-[#e8ebf0]"
        aria-label="Navigasi Bawah"
      >
        <div className="flex items-center justify-around h-16 px-1 max-w-2xl mx-auto">
          {MOBILE_TABS.map((tab) => {
            const isActive =
              activeScreen === tab.id ||
              (tab.id === 'profil' && activeScreen === 'manager');
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center w-16 h-12 min-w-[44px] min-h-[44px] transition-colors ${
                  isActive
                    ? 'text-[#c8102e] font-semibold'
                    : 'text-[#515f74] hover:text-[#191c1e]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    isActive ? 'fill-icon' : ''
                  }`}
                >
                  {tab.icon}
                </span>
                <span className="text-[11px] leading-tight mt-0.5 whitespace-nowrap">
                  {tab.label}
                </span>
                {tab.badge === 'approvals' && pendingApprovalsCount > 0 && (
                  <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-[#c8102e]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
