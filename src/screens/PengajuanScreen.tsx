import React, { useMemo, useState } from 'react';
import { ModalSheet } from '../components/ModalSheet';
import { SafeImage } from '../components/SafeImage';
import { ASSETS } from '../data/hrisData';
import { LeaveOrServiceTicket, PengajuanCategory } from '../types';

interface PengajuanScreenProps {
  activeCategory: PengajuanCategory;
  onChangeCategory: (cat: PengajuanCategory) => void;
  tickets: LeaveOrServiceTicket[];
  onAddTicket: (ticket: LeaveOrServiceTicket) => void;
  onCancelTicket: (id: string) => void;
  onShowToast: (msg: string) => void;
}

const SERVICE_TABS: { id: PengajuanCategory; label: string; icon: string }[] = [
  { id: 'cuti', label: 'Cuti', icon: 'event_busy' },
  { id: 'lembur', label: 'Lembur', icon: 'more_time' },
  { id: 'klaim', label: 'Klaim', icon: 'receipt_long' },
  { id: 'kasbon', label: 'Kasbon', icon: 'payments' },
  { id: 'koreksi', label: 'Koreksi Absen', icon: 'fact_check' },
  { id: 'dinas', label: 'Dinas Luar', icon: 'commute' },
  { id: 'atk', label: 'ATK', icon: 'inventory_2' },
  { id: 'resign', label: 'Resign', icon: 'exit_to_app' },
];

export const PengajuanScreen: React.FC<PengajuanScreenProps> = ({
  activeCategory,
  onChangeCategory,
  tickets,
  onAddTicket,
  onCancelTicket,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'process' | 'done'>('all');
  const [selectedTicketModal, setSelectedTicketModal] =
    useState<LeaveOrServiceTicket | null>(null);

  // Leave Form State
  const [leaveType, setLeaveType] = useState('sakit');
  const [startDate, setStartDate] = useState('2026-12-01');
  const [endDate, setEndDate] = useState('2026-12-03');
  const [leaveReason, setLeaveReason] = useState(
    'Istirahat pemulihan pasca tindakan medis & demam sesuai anjuran faskes klinik mitra.'
  );
  const [hasAttachment, setHasAttachment] = useState(true);
  const [picIndex, setPicIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Other service form state
  const [genericTitle, setGenericTitle] = useState('');
  const [genericAmountOrTime, setGenericAmountOrTime] = useState('');
  const [genericNotes, setGenericNotes] = useState('');

  const picOptions = [
    { initials: 'DP', name: 'Doni Prasetyo, S.T.', role: 'Site Supervisor Proyek Blok-B • Ext. 104' },
    { initials: 'HK', name: 'Hendra Kurniawan', role: 'Drafter & BIM Site • Ext. 108' },
  ];

  const durationDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 1;
    return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  }, [startDate, endDate]);

  const formatDateIndo = (iso: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const leaveLabelMap: Record<string, string> = {
      sakit: 'Cuti Sakit',
      tahunan: 'Cuti Tahunan Standar',
      khusus: 'Cuti Khusus PKB',
      kompensasi: 'Cuti Kompensasi Lembur',
    };
    setTimeout(() => {
      const newTicket: LeaveOrServiceTicket = {
        id: `#CUT-202611-${String(Math.floor(100 + Math.random() * 899))}`,
        category: 'cuti',
        title: `${leaveLabelMap[leaveType] || 'Cuti'} (${durationDays} Hari)`,
        subtitle: `Periode: ${formatDateIndo(startDate)} - ${formatDateIndo(endDate)} • Baru Diajukan`,
        dateRange: `${formatDateIndo(startDate)} - ${formatDateIndo(endDate)}`,
        status: 'Menunggu Approval HCGA',
        statusTone: 'warning',
        icon: 'event_busy',
        amountOrDays: `${durationDays} Hari Kerja`,
        timeline: [
          {
            title: 'Pengajuan Oleh Karyawan',
            timestamp: 'Baru saja',
            actor: 'Bayu Pratama, S.T. (Terkirim via ESS Mobile)',
            note: leaveReason,
            status: 'done',
          },
          {
            title: 'Persetujuan Atasan Langsung',
            timestamp: 'Sedang Meninjau',
            actor: 'Ir. Bambang Santoso (Project Manager Site Timur)',
            status: 'active',
            statusBadge: 'Menunggu Review',
          },
          {
            title: 'HCGA / HR Director Review',
            timestamp: 'Menunggu Tahap 2',
            actor: 'Budi Santoso, S.Psi., M.M.',
            status: 'pending',
          },
          {
            title: 'Sinkronisasi Payroll & Kuota',
            timestamp: 'Menunggu Tahap 3',
            actor: 'Sistem Otomatisasi HRIS ARIFINDO',
            status: 'pending',
          },
        ],
      };
      onAddTicket(newTicket);
      setIsSubmitting(false);
      onShowToast('Permohonan cuti terkirim ke atasan & HCGA!');
    }, 800);
  };

  const handleSubmitGeneric = (e: React.FormEvent) => {
    e.preventDefault();
    const tabMeta = SERVICE_TABS.find((t) => t.id === activeCategory);
    const titleVal =
      genericTitle.trim() || `${tabMeta?.label || 'Layanan'} Operasional Site`;
    const newTicket: LeaveOrServiceTicket = {
      id: `#${activeCategory.toUpperCase().slice(0, 3)}-202611-${Math.floor(100 + Math.random() * 899)}`,
      category: activeCategory,
      title: titleVal,
      subtitle: `${genericAmountOrTime || '26 Nov 2026'} • ${genericNotes || 'Pengajuan via Layanan Mandiri'}`,
      dateRange: '26 Nov 2026',
      status: 'Menunggu Approval HCGA',
      statusTone: 'warning',
      icon: tabMeta?.icon || 'post_add',
      amountOrDays: genericAmountOrTime || undefined,
    };
    onAddTicket(newTicket);
    setGenericTitle('');
    setGenericAmountOrTime('');
    setGenericNotes('');
    onShowToast(`Pengajuan ${tabMeta?.label} berhasil dikirim!`);
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesQuery =
        !searchQuery.trim() ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        historyFilter === 'all'
          ? true
          : historyFilter === 'process'
          ? t.status === 'Menunggu Approval HCGA'
          : t.status !== 'Menunggu Approval HCGA';
      return matchesQuery && matchesFilter;
    });
  }, [tickets, searchQuery, historyFilter]);

  const inProgressCount = tickets.filter(
    (t) => t.status === 'Menunggu Approval HCGA'
  ).length;

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Top Section / Hub Title & Quick Search */}
      <section className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-[22px] leading-[28px] font-extrabold text-[#191c1e] tracking-tight">
              Layanan Mandiri
            </h1>
            <p className="text-[12px] text-[#515f74] mt-0.5">
              Pengajuan cuti, lembur, klaim biaya &amp; administrasi kepegawaian
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#e7e8ea] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[#9e001f] text-[22px]">
              badge
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-xs border border-[#edeef0]">
          <div className="flex items-center gap-2 flex-1 px-3 py-1.5 bg-[#f2f4f6] rounded-lg text-[#515f74]">
            <span className="material-symbols-outlined text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tiket, jenis izin, atau berkas..."
              className="bg-transparent text-[13px] text-[#191c1e] placeholder:text-[#515f74] focus:outline-none w-full"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setHistoryFilter((prev) =>
                prev === 'all' ? 'process' : prev === 'process' ? 'done' : 'all'
              )
            }
            aria-label="Filter Pengajuan"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#e7e8ea] text-[#191c1e] flex items-center justify-center shrink-0 hover:bg-[#e1e2e4] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </section>

      {/* Segmented Horizontal Scrollable Tabs */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {SERVICE_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeCategory(tab.id)}
                className={`flex items-center gap-1.5 px-4 h-11 min-h-[44px] rounded-full text-[13px] font-semibold shrink-0 shadow-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#9e001f] text-white'
                    : 'bg-white text-[#515f74] hover:text-[#191c1e] border border-[#edeef0]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    isActive ? 'fill-icon' : ''
                  }`}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content 2-Column Split on Desktop */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-5">
        {/* Left Column: Quota Card & Active Form */}
        <div className="flex flex-col gap-4 lg:col-span-6">
          {activeCategory === 'cuti' ? (
            <>
              {/* Kartu Cuti Digital 2026 */}
              <section className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0]">
                <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-gradient-to-br from-[#9e001f]/10 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#ffdad8] flex items-center justify-center text-[#9e001f]">
                      <span className="material-symbols-outlined text-[18px]">
                        card_membership
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display text-[13px] font-bold text-[#191c1e]">
                        Kartu Cuti Digital 2026
                      </h2>
                      <p className="text-[11px] text-[#515f74]">
                        NIK: ARF-2019-082 • Bayu Pratama, S.T.
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#d5e3fd] text-[#0d1c2f] text-[10px] tracking-wide uppercase font-semibold">
                    TETAP / SITE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 bg-[#f2f4f6] rounded-xl p-3 relative z-10 text-center">
                  <div className="flex flex-col items-center justify-center p-1">
                    <span className="text-[11px] text-[#515f74] font-medium">
                      Hak Tahunan
                    </span>
                    <span className="font-display text-[20px] font-bold text-[#191c1e] mt-0.5 tabular-nums">
                      12
                    </span>
                    <span className="text-[10px] text-[#515f74]">Hari Kerja</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1.5 bg-white rounded-lg shadow-xs">
                    <span className="text-[11px] text-[#9e001f] font-bold">
                      Sisa Kuota Aktif
                    </span>
                    <span className="font-display text-[30px] font-extrabold text-[#9e001f] mt-0.5 leading-none tabular-nums">
                      8
                    </span>
                    <span className="text-[10px] text-[#9e001f] font-semibold mt-0.5">
                      Hari Tersedia
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1">
                    <span className="text-[11px] text-[#515f74] font-medium">Terpakai</span>
                    <span className="font-display text-[20px] font-bold text-[#515f74] mt-0.5 tabular-nums">
                      4
                    </span>
                    <span className="text-[10px] text-[#515f74]">Hari Berjalan</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-1.5 relative z-10 text-[12px]">
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#f2f4f6]/70">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#005468]">
                        medical_services
                      </span>
                      <span className="text-[#191c1e]">Cuti Sakit (Rujukan Medis)</span>
                    </div>
                    <span className="font-semibold text-[#191c1e] tabular-nums">14 Hari</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#f2f4f6]/70">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#515f74]">
                        family_restroom
                      </span>
                      <span className="text-[#191c1e]">Cuti Bersalin (Istri Melahirkan)</span>
                    </div>
                    <span className="font-semibold text-[#191c1e] tabular-nums">2 Hari</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#f2f4f6]/70">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#515f74]">
                        volunteer_activism
                      </span>
                      <span className="text-[#191c1e]">Cuti Khusus (Menikah/Duka PKB)</span>
                    </div>
                    <span className="font-semibold text-[#191c1e] tabular-nums">3 Hari</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#f2f4f6]/70">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#9e001f]">
                        engineering
                      </span>
                      <span className="text-[#191c1e]">Kompensasi Lembur Site Proyek</span>
                    </div>
                    <span className="font-semibold text-[#9e001f] tabular-nums">2 Hari</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-[#515f74]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    Berlaku s.d. 31 Des 2026
                  </span>
                  <span className="text-[10px] text-[#5c403f] font-medium bg-[#e7e8ea] px-2 py-0.5 rounded">
                    Hangus per 31 Mar 2027
                  </span>
                </div>
              </section>

              {/* Formulir Permohonan Cuti Baru */}
              <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9e001f]" />
                    <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                      Formulir Permohonan Cuti
                    </h2>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdad8] text-[#9e001f] text-[11px] font-semibold">
                    + Baru
                  </span>
                </div>

                <form onSubmit={handleSubmitLeave} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                      Jenis Permohonan Cuti
                    </label>
                    <div className="relative">
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full h-11 bg-[#f2f4f6] text-[#191c1e] text-[14px] px-3 pr-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9e001f]/20 appearance-none"
                      >
                        <option value="sakit">Cuti Sakit (Rawat Jalan / Rawat Inap)</option>
                        <option value="tahunan">Cuti Tahunan Standar</option>
                        <option value="khusus">Cuti Khusus PKB (Menikah/Keluarga)</option>
                        <option value="kompensasi">Cuti Kompensasi Offsite Lembur</option>
                      </select>
                      <span className="material-symbols-outlined text-[#515f74] absolute right-3 top-2.5 pointer-events-none text-[20px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                      Tanggal Pelaksanaan
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#f2f4f6] rounded-xl px-3 py-2 flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#515f74] font-medium">
                          Tanggal Mulai
                        </span>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent text-[12px] font-semibold text-[#191c1e] focus:outline-none"
                        />
                      </div>
                      <div className="bg-[#f2f4f6] rounded-xl px-3 py-2 flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#515f74] font-medium">
                          Tanggal Selesai
                        </span>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent text-[12px] font-semibold text-[#191c1e] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#e7e8ea]/70 mt-1">
                      <span className="text-[11px] text-[#515f74] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#005468]">
                          timelapse
                        </span>
                        Durasi:
                      </span>
                      <span className="text-[11px] font-bold text-[#005468] tabular-nums">
                        {durationDays} Hari Kerja
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                      Keterangan &amp; Alasan Pengajuan
                    </label>
                    <div className="bg-[#f2f4f6] rounded-xl p-2.5">
                      <textarea
                        rows={2}
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="w-full bg-transparent text-[12px] text-[#191c1e] placeholder:text-[#515f74] focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Lampiran Surat Dokter */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                        Lampiran (Wajib untuk Cuti Sakit)
                      </label>
                      <span className="text-[10px] text-[#9e001f] font-semibold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        Validasi Surat
                      </span>
                    </div>

                    {hasAttachment ? (
                      <div className="p-2.5 rounded-xl bg-[#f2f4f6] flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg bg-[#e1e2e4] overflow-hidden shrink-0 flex items-center justify-center relative">
                            <SafeImage
                              src={ASSETS.doctorNote}
                              alt="Surat Dokter Klinik Mitra"
                              className="w-full h-full object-cover"
                              fallbackIcon="description"
                            />
                            <div className="absolute inset-0 bg-[#9e001f]/10 pointer-events-none" />
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-[12px] font-semibold text-[#191c1e] truncate">
                              surat_dokter_klinik_mitra.jpg
                            </span>
                            <span className="text-[11px] text-[#515f74]">
                              Ukuran: 1.8 MB • Gambar Terunggah
                            </span>
                            <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] text-[#005468] font-semibold">
                              <span className="material-symbols-outlined text-[12px]">
                                check_circle
                              </span>
                              Terverifikasi Asli
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => onShowToast('Membuka kamera untuk foto ulang lampiran')}
                            className="flex-1 h-11 rounded-lg bg-white text-[#191c1e] text-[12px] font-medium flex items-center justify-center gap-1 shadow-xs hover:bg-[#edeef0] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#515f74]">
                              photo_camera
                            </span>
                            <span>Foto Ulang</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHasAttachment(false);
                              onShowToast('Lampiran dihapus');
                            }}
                            className="flex-1 h-11 rounded-lg bg-white text-[#ba1a1a] text-[12px] font-medium flex items-center justify-center gap-1 shadow-xs hover:bg-[#edeef0] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            <span>Hapus Lampiran</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setHasAttachment(true);
                          onShowToast('Lampiran surat dokter diunggah ulang');
                        }}
                        className="h-14 rounded-xl border border-dashed border-[#906f6e] bg-[#f2f4f6] text-[#515f74] text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-[#edeef0] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">upload_file</span>
                        <span>Unggah Surat Dokter / Bukti Pendukung</span>
                      </button>
                    )}
                  </div>

                  {/* PIC Pengganti */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                      Delegasi Tugas / PIC Pengganti
                    </label>
                    <button
                      type="button"
                      onClick={() => setPicIndex((i) => (i + 1) % picOptions.length)}
                      className="flex items-center gap-2.5 p-2.5 bg-[#f2f4f6] hover:bg-[#edeef0] rounded-xl text-left transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#d5e3fd] text-[#57657b] flex items-center justify-center font-bold text-[12px] shrink-0">
                        {picOptions[picIndex].initials}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[12px] font-semibold text-[#191c1e] truncate">
                          {picOptions[picIndex].name}
                        </span>
                        <span className="text-[11px] text-[#515f74] truncate">
                          {picOptions[picIndex].role}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[#515f74] text-[18px]">
                        cached
                      </span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 w-full h-12 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isSubmitting ? 'refresh' : 'send'}
                    </span>
                    <span>
                      {isSubmitting
                        ? 'Memproses Data & Lampiran...'
                        : 'Kirim Permohonan Cuti'}
                    </span>
                  </button>
                </form>
              </section>
            </>
          ) : (
            /* Dynamic Form for Other 7 ESS Categories (Lembur, Klaim, Kasbon, Koreksi, Dinas, ATK, Resign) */
            <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Formulir{' '}
                  {SERVICE_TABS.find((t) => t.id === activeCategory)?.label}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad8] text-[#9e001f] text-[11px] font-semibold">
                  Layanan ESS
                </span>
              </div>
              <form onSubmit={handleSubmitGeneric} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                    Judul / Keperluan
                  </label>
                  <input
                    type="text"
                    required
                    value={genericTitle}
                    onChange={(e) => setGenericTitle(e.target.value)}
                    placeholder={`Contoh: Pengajuan ${
                      SERVICE_TABS.find((t) => t.id === activeCategory)?.label
                    } Proyek Tower B`}
                    className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#9e001f]/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                    {activeCategory === 'klaim' || activeCategory === 'kasbon'
                      ? 'Nominal (Rp)'
                      : 'Tanggal / Jam Pelaksanaan'}
                  </label>
                  <input
                    type="text"
                    required
                    value={genericAmountOrTime}
                    onChange={(e) => setGenericAmountOrTime(e.target.value)}
                    placeholder={
                      activeCategory === 'klaim' || activeCategory === 'kasbon'
                        ? 'Contoh: Rp 350.000'
                        : 'Contoh: 27 Nov 2026 (17:00 - 21:00)'
                    }
                    className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[14px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#9e001f]/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#515f74]">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    rows={3}
                    value={genericNotes}
                    onChange={(e) => setGenericNotes(e.target.value)}
                    placeholder="Jelaskan rincian tugas, lokasi, atau nomor bukti pendukung..."
                    className="w-full p-3 rounded-xl bg-[#f2f4f6] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#9e001f]/20 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>
                    Kirim Pengajuan{' '}
                    {SERVICE_TABS.find((t) => t.id === activeCategory)?.label}
                  </span>
                </button>
              </form>
            </section>
          )}
        </div>

        {/* Right Column: Riwayat Pengajuan & Timeline Persetujuan Bertingkat */}
        <div className="flex flex-col gap-3 lg:col-span-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                Riwayat &amp; Status Pengajuan
              </h2>
              <span className="text-[11px] text-[#515f74]">
                Alur approval bertingkat sesuai struktur SOP HCGA
              </span>
            </div>
          </div>

          {/* Filter Pills for History */}
          <div className="flex items-center gap-2 py-0.5">
            <button
              type="button"
              onClick={() => setHistoryFilter('all')}
              className={`px-3.5 h-10 rounded-full text-[12px] font-semibold shadow-xs transition-colors ${
                historyFilter === 'all'
                  ? 'bg-[#e1e2e4] text-[#191c1e]'
                  : 'bg-white text-[#515f74] border border-[#edeef0]'
              }`}
            >
              Semua ({tickets.length})
            </button>
            <button
              type="button"
              onClick={() => setHistoryFilter('process')}
              className={`px-3.5 h-10 rounded-full text-[12px] font-semibold shadow-xs flex items-center gap-1.5 transition-colors ${
                historyFilter === 'process'
                  ? 'bg-[#ffdad8] text-[#9e001f]'
                  : 'bg-white text-[#515f74] border border-[#edeef0]'
              }`}
            >
              <span>Dalam Proses</span>
              <span className="w-4 h-4 rounded-full bg-[#9e001f] text-white text-[10px] flex items-center justify-center font-bold tabular-nums">
                {inProgressCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setHistoryFilter('done')}
              className={`px-3.5 h-10 rounded-full text-[12px] font-semibold shadow-xs transition-colors ${
                historyFilter === 'done'
                  ? 'bg-[#e1e2e4] text-[#191c1e]'
                  : 'bg-white text-[#515f74] border border-[#edeef0]'
              }`}
            >
              Selesai
            </button>
          </div>

          {/* Ticket Cards */}
          <div className="flex flex-col gap-3">
            {filteredTickets.map((ticket) =>
              ticket.timeline ? (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[#9e001f] font-bold text-[11px]">
                        {ticket.id}
                      </span>
                      <h3 className="font-display text-[15px] font-bold text-[#191c1e] mt-0.5">
                        {ticket.title}
                      </h3>
                      <span className="text-[11px] text-[#515f74]">
                        {ticket.subtitle}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                        ticket.status === 'Dibatalkan'
                          ? 'bg-[#edeef0] text-[#515f74]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {ticket.status === 'Menunggu Approval HCGA'
                        ? 'Review HCGA'
                        : ticket.status}
                    </span>
                  </div>

                  {/* Multi-level Vertical Approval Timeline */}
                  <div className="relative pl-6 flex flex-col gap-4 my-1">
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#e7e8ea]" />
                    {ticket.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className={`relative flex flex-col ${
                          step.status === 'pending' ? 'opacity-50' : ''
                        }`}
                      >
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                            step.status === 'done'
                              ? 'bg-[#005468] text-white'
                              : step.status === 'active'
                              ? 'bg-[#ffdad8] text-[#9e001f]'
                              : 'bg-[#e7e8ea] text-[#515f74]'
                          }`}
                        >
                          {step.status === 'done' ? (
                            <span className="material-symbols-outlined text-[13px]">
                              check
                            </span>
                          ) : step.status === 'active' ? (
                            <span className="w-2 h-2 rounded-full bg-[#9e001f] animate-ping" />
                          ) : (
                            <span className="material-symbols-outlined text-[13px]">
                              lock
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[12px] font-bold ${
                              step.status === 'active'
                                ? 'text-[#9e001f]'
                                : step.status === 'done'
                                ? 'text-[#191c1e]'
                                : 'text-[#515f74]'
                            }`}
                          >
                            {step.title}
                          </span>
                          {step.statusBadge ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#ffdad8] text-[#9e001f] text-[10px] font-bold shrink-0">
                              {step.statusBadge}
                            </span>
                          ) : (
                            <span
                              className={`text-[10px] shrink-0 ${
                                step.timestamp.includes('Disetujui')
                                  ? 'text-[#005468] font-semibold'
                                  : 'text-[#515f74]'
                              }`}
                            >
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#515f74] mt-0.5">
                          {step.actor}
                        </p>
                        {step.note && (
                          <div className="mt-1 p-2 rounded-lg bg-[#f2f4f6] text-[11px] text-[#5c403f] italic">
                            {step.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedTicketModal(ticket)}
                      className="flex-1 h-11 rounded-xl bg-[#e7e8ea] text-[#191c1e] text-[12px] font-semibold flex items-center justify-center gap-1 hover:bg-[#e1e2e4] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        visibility
                      </span>
                      <span>Detail Berkas</span>
                    </button>
                    {ticket.status === 'Menunggu Approval HCGA' && (
                      <button
                        type="button"
                        onClick={() => {
                          onCancelTicket(ticket.id);
                          onShowToast(`Pengajuan ${ticket.id} dibatalkan`);
                        }}
                        className="h-11 px-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-[12px] font-semibold flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          cancel
                        </span>
                        <span>Batalkan</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeef0] flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#515f74] font-semibold text-[11px]">
                          {ticket.id}
                        </span>
                        {ticket.amountOrDays && (
                          <span className="px-2 py-0.5 rounded-full bg-[#d5e3fd] text-[#0d1c2f] text-[10px] font-bold">
                            {ticket.amountOrDays}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-[14px] font-bold text-[#191c1e] mt-1">
                        {ticket.title}
                      </h4>
                      <span className="text-[11px] text-[#515f74]">
                        {ticket.subtitle}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#b6ebff] text-[#001f28] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">
                        {ticket.icon}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[11px] text-[#005468] font-medium">
                      <span className="material-symbols-outlined text-[14px]">
                        task_alt
                      </span>
                      <span>{ticket.status}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        ticket.canDownload
                          ? onShowToast(`Mengunduh Surat Izin ${ticket.id}.pdf`)
                          : setSelectedTicketModal(ticket)
                      }
                      className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#9e001f] text-[11px] font-bold flex items-center gap-1 hover:bg-[#edeef0] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {ticket.canDownload ? 'download' : 'visibility'}
                      </span>
                      <span>{ticket.canDownload ? 'Unduh PDF' : 'Lihat Detail'}</span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      <ModalSheet
        open={Boolean(selectedTicketModal)}
        onClose={() => setSelectedTicketModal(null)}
        title={selectedTicketModal?.title || 'Detail Pengajuan'}
        subtitle={selectedTicketModal?.id}
      >
        {selectedTicketModal && (
          <div className="space-y-3 text-[13px]">
            <div className="p-3 rounded-xl bg-[#f2f4f6] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#515f74]">Status Saat Ini:</span>
                <span className="font-semibold text-[#191c1e]">
                  {selectedTicketModal.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#515f74]">Periode / Tanggal:</span>
                <span className="font-semibold text-[#191c1e]">
                  {selectedTicketModal.dateRange}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#515f74]">Ringkasan:</span>
                <span className="text-right text-[#191c1e] max-w-[200px]">
                  {selectedTicketModal.subtitle}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTicketModal(null)}
              className="w-full h-11 rounded-xl bg-[#c8102e] text-white font-semibold"
            >
              Tutup
            </button>
          </div>
        )}
      </ModalSheet>
    </div>
  );
};
