import React, { useEffect, useState } from 'react';
import { ModalSheet } from '../components/ModalSheet';
import {
  AttendanceRecord,
  LeaveOrServiceTicket,
  PengajuanCategory,
  ScreenId,
} from '../types';

interface BerandaScreenProps {
  attendance: AttendanceRecord;
  tickets: LeaveOrServiceTicket[];
  announcementAck: boolean;
  onToggleAnnouncementAck: () => void;
  onNavigate: (screen: ScreenId, pengajuanTab?: PengajuanCategory) => void;
  onShowToast: (msg: string) => void;
}

const ESS_MENU: {
  id: string;
  label: string;
  icon: string;
  targetScreen: ScreenId;
  pengajuanTab?: PengajuanCategory;
}[] = [
  { id: 'cuti', label: 'Cuti', icon: 'event_available', targetScreen: 'pengajuan', pengajuanTab: 'cuti' },
  { id: 'lembur', label: 'Lembur', icon: 'schedule', targetScreen: 'pengajuan', pengajuanTab: 'lembur' },
  { id: 'klaim', label: 'Klaim', icon: 'receipt_long', targetScreen: 'pengajuan', pengajuanTab: 'klaim' },
  { id: 'slip', label: 'Slip Gaji', icon: 'payments', targetScreen: 'dokumen' },
  { id: 'kpi', label: 'KPI', icon: 'monitoring', targetScreen: 'manager' },
  { id: 'tugas', label: 'Tugas', icon: 'assignment', targetScreen: 'manager' },
  { id: 'aset', label: 'Aset', icon: 'inventory_2', targetScreen: 'profil' },
  { id: 'training', label: 'Training', icon: 'school', targetScreen: 'dokumen' },
];

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  attendance,
  tickets,
  announcementAck,
  onToggleAnnouncementAck,
  onNavigate,
  onShowToast,
}) => {
  const [liveTime, setLiveTime] = useState('09:01:50 WIB');
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setLiveTime(`${h}:${m}:${s} WIB`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const badgeStyle = (tone: LeaveOrServiceTicket['statusTone']) => {
    switch (tone) {
      case 'warning':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'danger':
        return 'bg-[#ffdad6] text-[#93000a] border border-[#e5bdbb]';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-5">
      {/* Left Column on Desktop (7 cols) */}
      <div className="flex flex-col gap-4 lg:col-span-7">
        {/* Greeting & User Card */}
        <section className="bg-white border border-[#edeef0] rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-[22px] leading-[28px] font-extrabold text-[#191c1e] tracking-tight">
                  Selamat Pagi, Bayu!
                </h1>
                <span className="text-lg" aria-hidden="true">👋</span>
              </div>
              <p className="text-[12px] text-[#515f74] mt-0.5 font-medium">
                Site Architect Lead • NIK: ARF-2019-082
              </p>
            </div>
            <span className="bg-[#f2f4f6] text-[#515f74] text-[12px] font-semibold px-2.5 py-0.5 rounded-full border border-[#edeef0] shrink-0">
              Aktif
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#edeef0] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#515f74] text-[18px]">
                location_city
              </span>
              <span className="text-[12px] text-[#515f74] font-medium truncate">
                {attendance.locationName}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('manager')}
              className="text-[11px] font-semibold text-[#c8102e] hover:underline whitespace-nowrap shrink-0"
            >
              Hub Manager →
            </button>
          </div>
        </section>

        {/* Card "Absensi Hari Ini" */}
        <section className="bg-white border border-[#edeef0] rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#515f74] text-[18px]">
                calendar_today
              </span>
              <span className="font-display text-[14px] font-bold text-[#191c1e]">
                {attendance.dateLabel}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#f2f4f6] px-2.5 py-1 rounded-md border border-[#edeef0]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-[#191c1e] tabular-nums">
                {liveTime}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Jam Masuk */}
            <div className="bg-[#f2f4f6] border border-[#edeef0] rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] text-[#515f74] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">login</span>
                  <span>Masuk</span>
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-emerald-200">
                  {attendance.checkInStatus}
                </span>
              </div>
              <div className="font-display text-[19px] font-bold text-[#191c1e] tabular-nums">
                {attendance.checkInTime}
              </div>
              <div className="text-[11px] text-[#515f74] mt-0.5">Jadwal: 08:00 WIB</div>
            </div>

            {/* Jam Pulang */}
            <div className="bg-[#f2f4f6] border border-[#edeef0] rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] text-[#515f74] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">logout</span>
                  <span>Pulang</span>
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    attendance.checkOutTime
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-[#edeef0] text-[#515f74]'
                  }`}
                >
                  {attendance.checkOutStatus}
                </span>
              </div>
              <div
                className={`font-display text-[19px] font-bold tabular-nums ${
                  attendance.checkOutTime ? 'text-[#191c1e]' : 'text-[#515f74]'
                }`}
              >
                {attendance.checkOutTime || '--:--'}
              </div>
              <div className="text-[11px] text-[#515f74] mt-0.5">Jadwal: 17:00 WIB</div>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#f8fafc] border border-[#edeef0] rounded-lg p-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-[20px] mt-0.5">
              check_circle
            </span>
            <div className="text-[12px] leading-relaxed">
              <p className="font-semibold text-[#191c1e]">Site Grand Arifindo Sidoarjo</p>
              <p className="text-[#515f74] text-[11px]">
                Radius: {attendance.radiusMeters}m / {attendance.maxRadiusMeters}m • Di dalam zona presensi proyek
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('absensi')}
            className="w-full min-h-[48px] bg-[#c8102e] hover:bg-[#a50d25] active:bg-[#890b1f] text-white font-display text-[14px] font-bold py-3 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined fill-icon text-[20px]">
              fingerprint
            </span>
            <span>
              {attendance.checkOutTime ? 'Perbarui Verifikasi Presensi' : 'Absen Pulang Sekarang'}
            </span>
          </button>
        </section>

        {/* Quick Action Grid (8 Menu - 4x2) */}
        <section className="bg-white border border-[#edeef0] rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <h2 className="font-display text-[14px] font-bold text-[#191c1e] mb-3">
            Layanan Mandiri (ESS)
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {ESS_MENU.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.targetScreen, item.pengajuanTab)}
                className="flex flex-col items-center group active:scale-95 transition-transform py-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f2f4f6] border border-[#edeef0] flex items-center justify-center group-hover:bg-[#fdeef0] group-hover:border-[#e5bdbb] transition-colors">
                  <span className="material-symbols-outlined text-[#515f74] group-hover:text-[#c8102e] text-[22px] transition-colors">
                    {item.icon}
                  </span>
                </div>
                <span className="text-[12px] font-medium text-[#191c1e] mt-1.5">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column on Desktop (5 cols) */}
      <div className="flex flex-col gap-4 lg:col-span-5">
        {/* Card Pengumuman Perusahaan */}
        <section className="bg-white border border-[#edeef0] rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#515f74] text-[18px]">
                campaign
              </span>
              <span className="font-display text-[14px] font-bold text-[#191c1e]">
                Pengumuman Resmi
              </span>
            </div>
            <span className="bg-[#f2f4f6] text-[#515f74] border border-[#edeef0] text-[10px] font-bold px-2 py-0.5 rounded-full">
              Baru
            </span>
          </div>
          <h3 className="text-[14px] font-semibold text-[#191c1e] leading-snug">
            Pemberlakuan SOP K3 Baru &amp; Kebijakan Masa Cuti Bersama Akhir Tahun 2026
          </h3>
          <p className="text-[12px] text-[#515f74] mt-1.5 line-clamp-2 leading-relaxed">
            Diharapkan seluruh personel kantor pusat dan site proyek membaca dan mengonfirmasi pemahaman dokumen kepatuhan kerja serta jadwal operasional...
          </p>
          <div className="mt-3 pt-3 border-t border-[#edeef0] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onToggleAnnouncementAck();
                if (!announcementAck) {
                  onShowToast('Konfirmasi pembacaan pengumuman tersimpan');
                }
              }}
              className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-lg border transition-colors active:scale-95 min-h-[40px] ${
                announcementAck
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-[#f2f4f6] border-[#edeef0] text-[#515f74] hover:text-[#191c1e]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  announcementAck ? 'text-emerald-600' : ''
                }`}
              >
                {announcementAck ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>{announcementAck ? 'Sudah dikonfirmasi' : 'Saya sudah membaca'}</span>
            </button>
            <button
              type="button"
              onClick={() => setAnnouncementModalOpen(true)}
              className="text-[12px] font-semibold text-[#515f74] hover:text-[#c8102e] flex items-center gap-0.5 px-2 py-2"
            >
              <span>Detail</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Card "Pengajuan Saya" */}
        <section className="bg-white border border-[#edeef0] rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#515f74] text-[18px]">
                fact_check
              </span>
              <h2 className="font-display text-[14px] font-bold text-[#191c1e]">
                Pengajuan Saya
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('pengajuan')}
              className="text-[12px] font-semibold text-[#515f74] hover:text-[#c8102e] flex items-center"
            >
              <span>Lihat Semua</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {tickets.slice(0, 4).map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => onNavigate('pengajuan', ticket.category)}
                className="w-full text-left p-2.5 rounded-lg border border-[#edeef0] bg-[#f2f4f6]/50 hover:bg-[#f2f4f6] transition-colors flex items-center justify-between gap-2"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#edeef0] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#515f74] text-[17px]">
                      {ticket.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-[#191c1e] truncate">
                      {ticket.title}
                    </p>
                    <p className="text-[11px] text-[#515f74] truncate">
                      {ticket.dateRange}
                      {ticket.amountOrDays ? ` • ${ticket.amountOrDays}` : ''}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badgeStyle(
                    ticket.statusTone
                  )}`}
                >
                  {ticket.status}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Announcement Detail Modal */}
      <ModalSheet
        open={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        title="Pengumuman Resmi Perusahaan"
        subtitle="Nomor: 112/ARF-HCGA/SE/XI/2026 • 20 November 2026"
      >
        <div className="space-y-3 text-[13px] text-[#475569] leading-relaxed">
          <div className="p-3 rounded-xl bg-[#f2f4f6] text-[#191c1e] font-semibold">
            Pemberlakuan SOP K3 Baru &amp; Kebijakan Masa Cuti Bersama Akhir Tahun 2026
          </div>
          <p>
            Kepada seluruh karyawan PT Arifindo Adiputra Ariaguna di Kantor Pusat maupun Proyek Lapangan:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Protokol Keselamatan Konstruksi K3 (Rev. 2026):</strong> Wajib menggunakan APD lengkap termasuk helm berstandar SNI, rompi reflektif, dan inspeksi harian alat berat sebelum jam operasional pukul 08:00 WIB.
            </li>
            <li>
              <strong>Jadwal Cuti Bersama Akhir Tahun:</strong> Periode operasional cuti bersama ditetapkan pada tanggal 24 – 26 Desember 2026. Pengajuan cuti tambahan wajib diserahkan paling lambat H-7 melalui aplikasi ARIFINDOne.
            </li>
          </ul>
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (!announcementAck) onToggleAnnouncementAck();
                setAnnouncementModalOpen(false);
                onShowToast('Pemahaman pengumuman telah dikonfirmasi');
              }}
              className="flex-1 h-11 rounded-xl bg-[#c8102e] text-white font-semibold text-[13px] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Konfirmasi Sudah Membaca</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAnnouncementModalOpen(false);
                onNavigate('dokumen');
              }}
              className="h-11 px-4 rounded-xl bg-[#edeef0] text-[#191c1e] font-semibold text-[13px]"
            >
              Buka Arsip SOP
            </button>
          </div>
        </div>
      </ModalSheet>
    </div>
  );
};
