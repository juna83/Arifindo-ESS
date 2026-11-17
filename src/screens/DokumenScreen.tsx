import React, { useState } from 'react';
import { ModalSheet } from '../components/ModalSheet';
import { OfficialLetterItem, PayslipItem } from '../types';

interface DokumenScreenProps {
  payslips: PayslipItem[];
  onDownloadPayslip: (id: string, fileName: string) => void;
  letters: OfficialLetterItem[];
  onAddLetter: (letter: OfficialLetterItem) => void;
  sopK3Confirmed: boolean;
  onConfirmSopK3: () => void;
  onShowToast: (msg: string) => void;
}

type DocCategory = 'all' | 'slip' | 'pajak' | 'surat' | 'kebijakan' | 'diklat';

export const DokumenScreen: React.FC<DokumenScreenProps> = ({
  payslips,
  onDownloadPayslip,
  letters,
  onAddLetter,
  sopK3Confirmed,
  onConfirmSopK3,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<DocCategory>('all');
  const [revealedSlips, setRevealedSlips] = useState<Record<string, boolean>>({});
  const [previewPayslip, setPreviewPayslip] = useState<PayslipItem | null>(null);
  const [policyModalTitle, setPolicyModalTitle] = useState<string | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  // Request letter form state
  const [letterType, setLetterType] = useState('Surat Keterangan Aktif Bekerja (KPR / Bank)');
  const [letterTarget, setLetterTarget] = useState('');
  const [letterNote, setLetterNote] = useState('');

  const toggleSalary = (id: string) => {
    setRevealedSlips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (tab: DocCategory, sectionId: string) => {
    setActiveTab(tab);
    if (tab !== 'all') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const handleSubmitLetter = (e: React.FormEvent) => {
    e.preventDefault();
    const newLetter: OfficialLetterItem = {
      id: `sk-${Date.now()}`,
      title: letterType,
      purpose: `Keperluan: ${letterTarget.trim() || 'Keperluan Administrasi Resmi'}`,
      docNumber: `0${Math.floor(40 + Math.random() * 55)}/ARF-HCGA/SK/XI/2026`,
      issuedDate: '26 Nov 2026',
      signer: 'Budi Santoso (HCGA Dir.)',
      fileName: 'SK_Permohonan_Baru_XI_2026.pdf',
    };
    onAddLetter(newLetter);
    setLetterTarget('');
    setLetterNote('');
    setRequestModalOpen(false);
    onShowToast('Permohonan surat resmi berhasil diterbitkan & masuk antrean HCGA');
  };

  return (
    <div className="flex flex-col gap-5 pb-8">
      {/* Page Header & Subtitle */}
      <div className="flex flex-col pt-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#c8102e] text-white">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </span>
          <span className="text-[12px] text-[#515f74] font-semibold uppercase tracking-wider">
            Arsip Resmi Karyawan
          </span>
        </div>
        <h1 className="font-display text-[22px] font-extrabold text-[#191c1e] tracking-tight">
          Dokumen &amp; Slip Gaji
        </h1>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#515f74]">
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dokumen, periode, atau sertifikat..."
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-white text-[#191c1e] text-[14px] shadow-xs border border-[#edeef0] placeholder:text-[#515f74] focus:outline-none focus:ring-2 focus:ring-[#c8102e]/30 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          aria-label="Reset Filter Dokumen"
          className="w-11 h-11 shrink-0 rounded-xl bg-white text-[#515f74] border border-[#edeef0] shadow-xs flex items-center justify-center active:scale-95 transition-transform hover:text-[#191c1e]"
        >
          <span className="material-symbols-outlined text-[22px]">tune</span>
        </button>
      </div>

      {/* Segmented Category Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'slip' as const, label: 'Slip Gaji', icon: 'payments', target: 'section-slip' },
          { id: 'pajak' as const, label: 'Pajak 1721-A1', icon: 'receipt_long', target: 'section-pajak' },
          { id: 'surat' as const, label: 'Surat & Paklaring', icon: 'badge', target: 'section-surat' },
          { id: 'kebijakan' as const, label: 'SOP & Kebijakan', icon: 'gavel', target: 'section-kebijakan' },
          { id: 'diklat' as const, label: 'Sertifikat Diklat', icon: 'school', target: 'section-diklat' },
        ].map((tab) => {
          const active = activeTab === tab.id || (activeTab === 'all' && tab.id === 'slip');
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id, tab.target)}
              className={`shrink-0 h-11 px-4 rounded-full text-[12px] font-semibold shadow-xs flex items-center gap-1.5 transition-all whitespace-nowrap ${
                active
                  ? 'bg-[#c8102e] text-white'
                  : 'bg-white text-[#515f74] hover:text-[#191c1e] border border-[#edeef0]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Action Request Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0]">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad8] flex items-center justify-center shrink-0 text-[#c8102e]">
              <span className="material-symbols-outlined text-[22px]">post_add</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ffdad8] text-[#c8102e] uppercase tracking-wider mb-1">
                Layanan HCGA
              </span>
              <h3 className="font-display text-[16px] font-bold text-[#191c1e] leading-snug">
                Permohonan Surat Keterangan Kerja
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRequestModalOpen(true)}
            className="w-full sm:w-auto sm:px-5 h-11 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Buat Permohonan Surat</span>
          </button>
        </div>
      </div>

      {/* Responsive Desktop 2-Col Grid for Sections */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-5">
        {/* Left Column (6 cols): Slip Gaji */}
        <section id="section-slip" className="flex flex-col gap-3 lg:col-span-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c8102e] text-[20px]">
                lock
              </span>
              <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                Slip Gaji Bulanan
              </h2>
            </div>
            <span className="text-[12px] text-[#515f74]">Terkunci Enkripsi</span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#edeef0] text-[#191c1e]">
            <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0 mt-0.5">
              key
            </span>
            <p className="text-[12px] text-[#515f74] leading-snug">
              <strong className="text-[#191c1e] font-semibold">
                Slip dilindungi sandi:
              </strong>{' '}
              Gunakan 6 digit tanggal lahir Anda (
              <span className="font-mono text-[#c8102e] font-semibold">DDMMYY</span>) untuk
              membuka file PDF.
            </p>
          </div>

          {payslips
            .filter((p) => matchesSearch(`${p.monthLabel} ${p.periodLabel} slip gaji`))
            .map((slip) => {
              const isRevealed = Boolean(revealedSlips[slip.id]);
              return (
                <div
                  key={slip.id}
                  className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-[16px] font-bold text-[#191c1e]">
                          {slip.monthLabel}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                            slip.badgeTone === 'new'
                              ? 'bg-[#b6ebff] text-[#001f28]'
                              : slip.badgeTone === 'verified'
                              ? 'bg-[#d5e3fd] text-[#0d1c2f]'
                              : 'bg-[#edeef0] text-[#515f74]'
                          }`}
                        >
                          {slip.badgeTone === 'new' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#005468]" />
                          )}
                          {slip.badgeTone === 'verified' && (
                            <span className="material-symbols-outlined text-[13px]">
                              check_circle
                            </span>
                          )}
                          {slip.badgeText}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#515f74] mt-0.5 block">
                        {slip.periodLabel}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#edeef0] flex items-center justify-center shrink-0 text-[#515f74]">
                      <span className="material-symbols-outlined text-[20px]">
                        {slip.badgeTone === 'new' ? 'description' : 'receipt'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f4f6]">
                    <div>
                      <span className="text-[11px] font-medium text-[#515f74] uppercase tracking-wider">
                        Take Home Pay
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-display text-[20px] leading-tight font-extrabold text-[#191c1e] tabular-nums">
                          {isRevealed ? slip.takeHomePay : 'Rp ••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleSalary(slip.id)}
                          aria-label="Tampilkan / Sembunyikan Gaji"
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[#515f74] hover:text-[#191c1e] hover:bg-[#e7e8ea] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isRevealed ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      {slip.badgeTone === 'new' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#edeef0] text-[#515f74]">
                          AES-256
                        </span>
                      )}
                      <span className="block text-[11px] text-[#515f74] mt-0.5 tabular-nums">
                        {slip.downloadCount}x diunduh
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewPayslip(slip)}
                      className="h-11 px-3 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        lock_open
                      </span>
                      <span>Pratinjau</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownloadPayslip(slip.id, slip.fileName)}
                      className="h-11 px-3 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        download
                      </span>
                      <span>Unduh PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </section>

        {/* Right Column (6 cols): Pajak, Surat, Kebijakan, Diklat */}
        <div className="flex flex-col gap-5 lg:col-span-6">
          {/* SECTION 2: Pajak PPh 21 */}
          <section id="section-pajak" className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c8102e] text-[20px]">
                  account_balance
                </span>
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Pajak PPh 21 (1721-A1)
                </h2>
              </div>
              <span className="text-[12px] text-[#515f74]">SPT Tahunan</span>
            </div>

            {matchesSearch('Formulir 1721-A1 Tahun 2025 DJP Pajak') && (
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#b6ebff] text-[#001f28] inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        verified
                      </span>
                      Resmi Terbit DJP &amp; HCGA
                    </span>
                    <h3 className="font-display text-[16px] font-bold text-[#191c1e] mt-1">
                      Formulir 1721-A1 Tahun 2025
                    </h3>
                    <p className="text-[12px] text-[#515f74] mt-0.5">
                      Masa Pajak: Januari - Desember 2025 • NPWP Match
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#d5e3fd] flex items-center justify-center shrink-0 text-[#0d1c2f]">
                    <span className="material-symbols-outlined text-[22px]">
                      assignment_turned_in
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f4f6] text-[12px] text-[#515f74]">
                  <span>KLU: 41011 - Konstruksi Gedung</span>
                  <span className="font-semibold text-[#191c1e]">
                    Status: Nihil / Terpotong
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast('Mengunduh: Formulir_1721_A1_Th2025.pdf (Tersimpan)')
                  }
                  className="w-full h-11 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c8102e]">
                    file_download
                  </span>
                  <span>Unduh Bukti Potong (.PDF)</span>
                </button>
              </div>
            )}

            {matchesSearch('Formulir 1721-A1 Tahun 2024 Pajak') && (
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#edeef0] text-[#515f74]">
                      Arsip Terlapor
                    </span>
                    <h3 className="font-display text-[16px] font-bold text-[#191c1e] mt-1">
                      Formulir 1721-A1 Tahun 2024
                    </h3>
                    <p className="text-[12px] text-[#515f74] mt-0.5">
                      Masa Pajak: Januari - Desember 2024
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#edeef0] flex items-center justify-center shrink-0 text-[#515f74]">
                    <span className="material-symbols-outlined text-[22px]">folder</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast('Mengunduh: Formulir_1721_A1_Th2024.pdf (Tersimpan)')
                  }
                  className="w-full h-11 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] text-[#515f74] hover:text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Unduh Arsip (.PDF)</span>
                </button>
              </div>
            )}
          </section>

          {/* SECTION 3: Surat Resmi Aktif */}
          <section id="section-surat" className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c8102e] text-[20px]">
                  approval
                </span>
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Surat Resmi Aktif
                </h2>
              </div>
              <span className="text-[12px] text-[#515f74]">E-Signed &amp; QR</span>
            </div>

            {letters
              .filter((l) => matchesSearch(`${l.title} ${l.purpose} ${l.docNumber}`))
              .map((letter) => (
                <div
                  key={letter.id}
                  className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#b6ebff] text-[#001f28] inline-flex items-center gap-1 mb-1">
                        <span className="material-symbols-outlined text-[13px]">
                          qr_code_2
                        </span>
                        QR Validasi Aktif
                      </span>
                      <h3 className="font-display text-[16px] font-bold text-[#191c1e] leading-snug">
                        {letter.title}
                      </h3>
                      <p className="text-[12px] text-[#515f74] mt-0.5">
                        {letter.purpose}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#f2f4f6] flex flex-col items-center justify-center shrink-0 text-[#c8102e] p-1">
                      <span className="material-symbols-outlined text-[24px]">
                        qr_code
                      </span>
                      <span className="text-[8px] font-bold tracking-tighter uppercase leading-none">
                        E-SIGN
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f2f4f6] space-y-1 text-[12px] text-[#515f74]">
                    <div className="flex items-center justify-between">
                      <span>Nomor Dokumen:</span>
                      <span className="font-mono font-semibold text-[#191c1e]">
                        {letter.docNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tanggal Terbit:</span>
                      <span className="text-[#191c1e]">{letter.issuedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Penandatangan:</span>
                      <span className="font-medium text-[#191c1e]">{letter.signer}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onShowToast(`Mengunduh: ${letter.fileName}`)}
                    className="w-full h-11 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Unduh PDF (Validasi QR)</span>
                  </button>
                </div>
              ))}
          </section>

          {/* SECTION 4: Kebijakan & SOP */}
          <section id="section-kebijakan" className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c8102e] text-[20px]">
                  policy
                </span>
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Kebijakan &amp; SOP
                </h2>
              </div>
              <span className="text-[12px] text-[#515f74]">Read Status</span>
            </div>

            {matchesSearch('Peraturan Perusahaan PP 2025-2027') && (
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#edeef0] flex items-center justify-center shrink-0 text-[#515f74]">
                    <span className="material-symbols-outlined text-[22px]">menu_book</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d5e3fd] text-[#0d1c2f] inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">
                        done_all
                      </span>
                      Sudah Dibaca (12 Jan 2025)
                    </span>
                    <h3 className="font-display text-[15px] font-bold text-[#191c1e] mt-1 leading-snug">
                      Peraturan Perusahaan (PP) 2025–2027
                    </h3>
                    <p className="text-[12px] text-[#515f74] mt-0.5">
                      PT. Arifindo Adiputra Ariaguna
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPolicyModalTitle('Peraturan Perusahaan (PP) 2025–2027')
                  }
                  className="w-full h-11 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>Baca Dokumen</span>
                </button>
              </div>
            )}

            {matchesSearch('SOP Keselamatan Konstruksi K3 Proyek Rev 2026') && (
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      sopK3Confirmed
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {sopK3Confirmed ? 'verified' : 'warning'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${
                        sopK3Confirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {sopK3Confirmed ? 'done_all' : 'notification_important'}
                      </span>
                      {sopK3Confirmed
                        ? 'Dikonfirmasi Dibaca (26 Nov 2026)'
                        : 'Wajib Baca & Konfirmasi'}
                    </span>
                    <h3 className="font-display text-[15px] font-bold text-[#191c1e] mt-1 leading-snug">
                      SOP Keselamatan Konstruksi K3 Proyek (Rev. 2026)
                    </h3>
                    <p className="text-[12px] text-[#515f74] mt-0.5">
                      Diperbarui: 10 Nov 2026 • Protokol Lapangan
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPolicyModalTitle('SOP K3 Konstruksi Proyek Lapangan (Rev. 2026)')
                  }
                  className={`w-full h-11 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all ${
                    sopK3Confirmed
                      ? 'bg-[#edeef0] text-[#191c1e]'
                      : 'bg-[#c8102e] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">rule</span>
                  <span>
                    {sopK3Confirmed ? 'Baca Ulang Dokumen' : 'Buka & Konfirmasi Baca'}
                  </span>
                </button>
              </div>
            )}
          </section>

          {/* SECTION 5: Sertifikat Diklat */}
          <section id="section-diklat" className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c8102e] text-[20px]">
                  workspace_premium
                </span>
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Sertifikat Diklat
                </h2>
              </div>
              <span className="text-[12px] text-[#515f74]">2 Tersimpan</span>
            </div>

            {matchesSearch('Sertifikasi K3 Ahli Muda Konstruksi BNSP') && (
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#b6ebff] flex items-center justify-center shrink-0 text-[#001f28]">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#edeef0] text-[#515f74]">
                      BNSP Terakreditasi
                    </span>
                    <h3 className="font-display text-[15px] font-bold text-[#191c1e] mt-1 leading-snug">
                      Sertifikasi K3 Ahli Muda Konstruksi
                    </h3>
                    <p className="text-[12px] text-[#515f74] mt-0.5">
                      Berlaku s.d. 14 Oktober 2028 • Reg: BNSP-ARF-8891
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast('Mengunduh: Sertifikat_K3_AhliMuda_BNSP.pdf')
                  }
                  className="w-full h-11 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c8102e]">
                    file_download
                  </span>
                  <span>Unduh Sertifikat PDF</span>
                </button>
              </div>
            )}

            {matchesSearch('BIM Architecture Specialist Level 2 Autodesk') && (
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#edeef0] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#d5e3fd] flex items-center justify-center shrink-0 text-[#0d1c2f]">
                    <span className="material-symbols-outlined text-[24px]">
                      military_tech
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#edeef0] text-[#515f74]">
                      Autodesk Certified
                    </span>
                    <h3 className="font-display text-[15px] font-bold text-[#191c1e] mt-1 leading-snug">
                      BIM Architecture Specialist - Level 2
                    </h3>
                    <p className="text-[12px] text-[#515f74] mt-0.5">
                      Terbit: Agustus 2025 • PT Arifindo Training Academy
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast('Mengunduh: BIM_Specialist_L2_Arifindo.pdf')
                  }
                  className="w-full h-11 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    file_download
                  </span>
                  <span>Unduh Sertifikat PDF</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Payslip Preview Modal */}
      <ModalSheet
        open={Boolean(previewPayslip)}
        onClose={() => setPreviewPayslip(null)}
        title={previewPayslip ? `Slip Gaji - ${previewPayslip.monthLabel}` : ''}
        subtitle={previewPayslip?.periodLabel}
      >
        {previewPayslip && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#f2f4f6] flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between text-[#515f74]">
                <span>Periode Pembukuan:</span>
                <span className="font-medium text-[#191c1e]">
                  {previewPayslip.periodLabel}
                </span>
              </div>
              <div className="flex justify-between text-[#515f74]">
                <span>Gaji Pokok &amp; Tunjangan Site:</span>
                <span className="font-semibold text-[#191c1e] tabular-nums">
                  {previewPayslip.takeHomePay}
                </span>
              </div>
              <div className="flex justify-between text-[#515f74]">
                <span>Potongan BPJS &amp; PPh 21:</span>
                <span className="font-medium text-[#ba1a1a] tabular-nums">
                  {previewPayslip.deductions}
                </span>
              </div>
              <div className="border-t border-[#d9dadc] pt-2 flex justify-between items-center">
                <span className="font-display font-bold text-[#191c1e]">
                  Total Bersih:
                </span>
                <span className="font-display text-[16px] font-extrabold text-[#c8102e] tabular-nums">
                  {previewPayslip.takeHomePay}
                </span>
              </div>
            </div>
            <p className="text-[12px] text-[#515f74] leading-snug">
              Dokumen ini telah dienkripsi secara digital dan disahkan oleh Departemen HCGA PT. Arifindo Adiputra Ariaguna.
            </p>
            <button
              type="button"
              onClick={() => {
                onDownloadPayslip(previewPayslip.id, previewPayslip.fileName);
                setPreviewPayslip(null);
              }}
              className="w-full h-11 rounded-xl bg-[#c8102e] text-white font-semibold text-[13px] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh PDF Terenkripsi</span>
            </button>
          </div>
        )}
      </ModalSheet>

      {/* Policy Viewer Modal */}
      <ModalSheet
        open={Boolean(policyModalTitle)}
        onClose={() => setPolicyModalTitle(null)}
        title={policyModalTitle || ''}
        subtitle="Compliance & Tata Tertib Operasional ARIFINDO"
      >
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#f2f4f6] text-[#515f74] text-[13px] leading-relaxed space-y-2">
            <p>
              <strong className="text-[#191c1e]">Status Pembacaan:</strong> Membuka berkas kebijakan resmi terintegrasi sistem compliance internal ARIFINDOne.
            </p>
            <p>
              Dengan membaca dan menyetujui dokumen ini, Anda menyatakan memahami tata tertib operasional dan standar keselamatan kerja PT Arifindo Adiputra Ariaguna.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onConfirmSopK3();
              setPolicyModalTitle(null);
              onShowToast('Konfirmasi baca berhasil dicatat.');
            }}
            className="w-full h-11 rounded-xl bg-[#005468] text-white text-[13px] font-semibold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Konfirmasi Telah Membaca</span>
          </button>
        </div>
      </ModalSheet>

      {/* Request Official Letter Modal */}
      <ModalSheet
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title="Buat Permohonan Surat Resmi"
        subtitle="Diterbitkan otomatis dengan tanda tangan digital QR HCGA"
      >
        <form onSubmit={handleSubmitLetter} className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#515f74] font-medium">
              Jenis Surat Keterangan:
            </label>
            <select
              value={letterType}
              onChange={(e) => setLetterType(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#edeef0] text-[#191c1e] text-[13px] focus:outline-none"
            >
              <option>Surat Keterangan Aktif Bekerja (KPR / Bank)</option>
              <option>Surat Rekomendasi Visa Kunjungan Bisnis</option>
              <option>Surat Pengalaman Kerja (Paklaring)</option>
              <option>Keterangan Penghasilan untuk Lembaga Keuangan</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#515f74] font-medium">
              Instansi / Bank Tujuan:
            </label>
            <input
              type="text"
              required
              value={letterTarget}
              onChange={(e) => setLetterTarget(e.target.value)}
              placeholder="Contoh: Bank BTN Kantor Cabang Thamrin"
              className="w-full h-11 px-3 rounded-xl bg-[#edeef0] text-[#191c1e] text-[13px] placeholder:text-[#515f74] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#515f74] font-medium">
              Catatan Tambahan:
            </label>
            <textarea
              rows={2}
              value={letterNote}
              onChange={(e) => setLetterNote(e.target.value)}
              placeholder="Tuliskan keperluan khusus jika ada..."
              className="w-full p-3 rounded-xl bg-[#edeef0] text-[#191c1e] text-[13px] placeholder:text-[#515f74] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Ajukan Permohonan Sekarang</span>
          </button>
        </form>
      </ModalSheet>
    </div>
  );
};
