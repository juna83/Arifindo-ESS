import React, { useState } from 'react';
import { ModalSheet } from '../components/ModalSheet';
import { SafeImage } from '../components/SafeImage';
import { ASSETS } from '../data/hrisData';
import { ScreenId } from '../types';

interface ProfilScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ProfilScreen: React.FC<ProfilScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [walletSaved, setWalletSaved] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [changeDataModalOpen, setChangeDataModalOpen] = useState(false);
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [infoSheet, setInfoSheet] = useState<{ title: string; body: string } | null>(null);

  // Change data form
  const [changeField, setChangeField] = useState('Nomor Rekening Payroll');
  const [changeValue, setChangeValue] = useState('');

  // Asset report form
  const [selectedAsset, setSelectedAsset] = useState('Lenovo ThinkPad P14s G4');
  const [assetIssue, setAssetIssue] = useState('');

  return (
    <div className="flex flex-col gap-5 pb-8">
      {/* Screen Title & Quick Action Bar */}
      <div className="flex items-center justify-between pt-1 gap-3">
        <div>
          <h1 className="font-display text-[22px] font-extrabold text-[#191c1e] tracking-tight">
            Profil Saya
          </h1>
          <p className="text-[12px] text-[#515f74] mt-0.5">
            Kartu Pegawai Digital &amp; Data Kepegawaian Terverifikasi
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('manager')}
            className="h-11 px-3 rounded-xl bg-[#d5e3fd] hover:bg-[#b9c7e0] text-[#0d1c2f] text-[12px] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">shield_person</span>
            <span className="hidden sm:inline">Mode Manager</span>
            <span className="sm:hidden">Manager</span>
          </button>
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            aria-label="Buka scanner barcode gerbang"
            className="w-11 h-11 rounded-xl bg-[#edeef0] hover:bg-[#e7e8ea] active:scale-95 flex items-center justify-center text-[#191c1e] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Split on Desktop */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-5">
        {/* Left Column (5 cols): Smart ID Card + Security */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Digital Employee ID Smart Card */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-[#c8102e] via-[#9e001f] to-[#410007] text-white p-4 flex flex-col justify-between min-h-[290px]">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-black/10 blur-xl pointer-events-none" />

            {/* Top Row */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-white">
                    corporate_fare
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[13px] tracking-wider uppercase font-bold leading-tight">
                    PT Arifindo Adiputra Ariaguna
                  </span>
                  <span className="text-[10px] text-[#ffdad8] tracking-widest uppercase">
                    Smart Enterprise Pass
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-[18px] text-amber-200">
                  contactless
                </span>
                <div className="w-5 h-3.5 rounded bg-amber-300/80 grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="bg-amber-600/60 rounded-xs" />
                  <div className="bg-amber-600/60 rounded-xs" />
                </div>
              </div>
            </div>

            {/* Middle Row */}
            <div className="relative z-10 flex items-start gap-4 mt-4">
              <div className="relative shrink-0">
                <div className="w-[76px] h-[92px] rounded-lg overflow-hidden bg-[#e7e8ea] shadow-inner">
                  <SafeImage
                    src={ASSETS.profilePortrait}
                    alt="Bayu Pratama, S.T."
                    className="w-full h-full object-cover"
                    fallbackIcon="person"
                  />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm"
                  title="Status Aktif"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
              </div>

              <div className="flex flex-col min-w-0 justify-center">
                <span className="text-[11px] font-semibold text-[#ffdad8] uppercase tracking-wider">
                  NIK: ARF-2019-082
                </span>
                <h2 className="font-display text-[18px] font-bold leading-tight text-white tracking-tight truncate mt-0.5">
                  Bayu Pratama, S.T.
                </h2>
                <p className="text-[14px] text-white/90 truncate mt-0.5">
                  Site Lead / Project Coordinator
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span className="text-[10px] font-semibold text-white">
                    PKWTT • Proyek &amp; Sipil
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom QR Row */}
            <div className="relative z-10 mt-4 bg-black/25 -mx-4 -mb-4 px-4 py-3 flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-xs text-[#191c1e]">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 40 40">
                    <rect fill="none" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="2" y="2" />
                    <rect fill="currentColor" height="6" width="6" x="5" y="5" />
                    <rect fill="none" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="26" y="2" />
                    <rect fill="currentColor" height="6" width="6" x="29" y="5" />
                    <rect fill="none" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="2" y="26" />
                    <rect fill="currentColor" height="6" width="6" x="5" y="29" />
                    <rect fill="currentColor" height="4" width="4" x="18" y="4" />
                    <rect fill="currentColor" height="6" width="4" x="18" y="12" />
                    <rect fill="currentColor" height="4" width="8" x="28" y="18" />
                    <rect fill="currentColor" height="4" width="4" x="18" y="22" />
                    <rect fill="currentColor" height="4" width="6" x="24" y="26" />
                    <rect fill="currentColor" height="8" width="4" x="34" y="28" />
                    <rect fill="currentColor" height="4" width="4" x="18" y="32" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[12px] text-white leading-tight font-semibold">
                    Scan Gate Turnstile
                  </span>
                  <span className="text-[10px] text-[#ffdad8]">
                    Berlaku s/d 31 Des 2026
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setWalletSaved(true);
                  onShowToast('Pass digital tersinkronisasi ke Google Wallet');
                }}
                className="min-h-[44px] px-3 rounded-lg bg-white text-[#9e001f] text-[12px] font-semibold flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {walletSaved ? 'check_circle' : 'wallet'}
                </span>
                <span>{walletSaved ? 'Tersimpan' : 'Simpan Pass'}</span>
              </button>
            </div>
          </div>

          {/* Keamanan & Akun */}
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[18px] font-bold text-[#191c1e] tracking-tight">
              Keamanan &amp; Akun
            </h2>
            <div className="rounded-xl bg-white shadow-xs border border-[#edeef0] divide-y divide-[#edeef0] overflow-hidden">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="w-full min-h-[56px] p-3.5 flex items-center justify-between hover:bg-[#f2f4f6] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#515f74]">
                    <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                  </div>
                  <div>
                    <span className="block text-[14px] text-[#191c1e] font-semibold">
                      Ganti Kata Sandi
                    </span>
                    <span className="text-[12px] text-[#515f74]">
                      Terakhir diubah 45 hari yang lalu
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#515f74] text-[20px]">
                  chevron_right
                </span>
              </button>

              <div className="min-h-[56px] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#515f74]">
                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                  </div>
                  <div>
                    <span className="block text-[14px] text-[#191c1e] font-semibold">
                      Autentikasi Biometrik &amp; 2FA
                    </span>
                    <span
                      className={`text-[12px] ${
                        biometricEnabled ? 'text-emerald-700' : 'text-[#515f74]'
                      }`}
                    >
                      {biometricEnabled
                        ? 'Face ID & Fingerprint Aktif'
                        : 'Nonaktif (Hanya Kata Sandi)'}
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer min-w-[44px] min-h-[44px] justify-center">
                  <input
                    type="checkbox"
                    checked={biometricEnabled}
                    onChange={(e) => {
                      setBiometricEnabled(e.target.checked);
                      onShowToast(
                        e.target.checked
                          ? 'Autentikasi Biometrik & 2FA diaktifkan'
                          : 'Autentikasi Biometrik dinonaktifkan'
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e1e2e4] rounded-full peer peer-checked:bg-emerald-600 transition-colors relative after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
                </label>
              </div>

              <button
                type="button"
                onClick={() =>
                  setInfoSheet({
                    title: 'Perangkat Terdaftar',
                    body: 'Perangkat utama terverifikasi: iPhone 14 Pro (iOS 19.2) • Lokasi Login Terakhir: Sidoarjo, Jawa Timur • Sesi SSO Enterprise aktif hingga 31 Des 2026.',
                  })
                }
                className="w-full min-h-[56px] p-3.5 flex items-center justify-between hover:bg-[#f2f4f6] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#515f74]">
                    <span className="material-symbols-outlined text-[18px]">smartphone</span>
                  </div>
                  <div>
                    <span className="block text-[14px] text-[#191c1e] font-semibold">
                      Perangkat Terdaftar
                    </span>
                    <span className="text-[12px] text-[#515f74]">
                      iPhone 14 Pro • Sesi Utama Saat Ini
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#515f74] text-[20px]">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setInfoSheet({
                    title: 'Syarat & Kebijakan Privasi',
                    body: 'Seluruh data biometrik presensi, dokumen slip gaji, dan informasi rekening payroll diproses sesuai UU PDP No. 27 Tahun 2022 dan Kebijakan Privasi Internal PT Arifindo Adiputra Ariaguna.',
                  })
                }
                className="w-full min-h-[56px] p-3.5 flex items-center justify-between hover:bg-[#f2f4f6] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#515f74]">
                    <span className="material-symbols-outlined text-[18px]">policy</span>
                  </div>
                  <div>
                    <span className="block text-[14px] text-[#191c1e] font-semibold">
                      Syarat &amp; Kebijakan Privasi
                    </span>
                    <span className="text-[12px] text-[#515f74]">
                      Regulasi Data Karyawan ARIFINDO
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#515f74] text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Data Kepegawaian + Aset Perusahaan + Logout */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          {/* Data Kepegawaian */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[18px] font-bold text-[#191c1e]">
                Data Kepegawaian
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#57657b] text-[12px] font-semibold">
                Terverifikasi
              </span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#e7e8ea] text-[#5c403f]">
              <span className="material-symbols-outlined text-[18px] text-[#9e001f] shrink-0 mt-0.5">
                verified_user
              </span>
              <p className="text-[12px] text-[#515f74]">
                Perubahan data pokok memerlukan persetujuan dari divisi HCGA &amp; Legal ARIFINDO.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#edeef0] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[12px] text-[#191c1e] font-semibold">
                    Tiket #UPD-202611-019
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                  Menunggu HR
                </span>
              </div>
              <p className="text-[12px] text-[#515f74]">
                Permohonan pembaruan: Perubahan Alamat Domisili Baru (Surabaya Selatan).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#edeef0] flex flex-col gap-3.5">
              {[
                { icon: 'badge', label: 'NIK / NPWP', val1: 'ARF-2019-082', val2: '41.011.892.4-604.000' },
                { icon: 'domain', label: 'Departemen', val1: 'Teknik & Konstruksi', val2: 'Divisi Sipil Lapangan' },
                { icon: 'location_on', label: 'Lokasi Kerja', val1: 'Grand Arifindo Sidoarjo', val2: 'Tower B • Gedung Terpadu' },
                { icon: 'mail', label: 'Email Kantor', val1: 'bayu.pratama@arifindo.co.id', val2: '+62 812-3456-7890' },
                { icon: 'home', label: 'Domisili', val1: 'Gayungsari Barat No. 18', val2: 'Surabaya, Jawa Timur' },
                { icon: 'account_balance', label: 'Rekening Gaji', val1: 'Bank Mandiri', val2: '141-00-1928374-1 (Bayu Pratama)' },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-[#515f74] text-[20px]">
                      {row.icon}
                    </span>
                    <span className="text-[12px] text-[#515f74]">{row.label}</span>
                  </div>
                  <div className="flex flex-col text-right min-w-0">
                    <span className="text-[13px] text-[#191c1e] font-semibold truncate">
                      {row.val1}
                    </span>
                    <span className="text-[12px] text-[#515f74] truncate">{row.val2}</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#515f74] text-[20px]">
                    health_and_safety
                  </span>
                  <span className="text-[12px] text-[#515f74]">Jaminan Sosial</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                    BPJS TK Aktif
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                    BPJS Kes Aktif
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setChangeDataModalOpen(true)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#edeef0] hover:bg-[#e1e2e4] active:scale-[0.99] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#9e001f]">
                  edit_document
                </span>
                <span>+ Ajukan Perubahan Data Pegawai</span>
              </button>
            </div>
          </section>

          {/* Aset Perusahaan */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-[18px] font-bold text-[#191c1e]">
                  Aset Perusahaan
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#d5e3fd] text-[#57657b] text-[12px] font-semibold">
                  3 Aktif
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setInfoSheet({
                    title: 'BAST Digital Aset Perusahaan',
                    body: 'Berita Acara Serah Terima (BAST) No. BAST/IT-GA/2023/044 telah ditandatangani secara elektronik oleh Bayu Pratama, S.T. dan Divisi General Affairs.',
                  })
                }
                className="text-[12px] font-semibold text-[#9e001f] flex items-center gap-0.5 hover:underline"
              >
                <span>BAST Digital</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#edeef0] flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#9e001f] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">laptop_mac</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[15px] font-bold text-[#191c1e] truncate">
                      Lenovo ThinkPad P14s G4
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold shrink-0">
                      Kondisi Baik
                    </span>
                  </div>
                  <span className="text-[12px] text-[#515f74] block mt-0.5">
                    No. Aset: AST-IT-2023-044
                  </span>
                  <span className="text-[11px] text-[#515f74] block mt-0.5">
                    Audit Terakhir: Inspeksi Berkala Q3 2026
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#edeef0] flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#9e001f] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    directions_car
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[15px] font-bold text-[#191c1e] truncate">
                      Toyota Hilux Double Cab 4x4
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-semibold shrink-0">
                      Unit Proyek
                    </span>
                  </div>
                  <span className="text-[12px] text-[#515f74] block mt-0.5">
                    Plat Nomor: L 8920 AF
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-amber-700">
                    <span className="material-symbols-outlined text-[14px]">
                      event_upcoming
                    </span>
                    <span className="text-[11px]">Jatuh tempo pajak: 14 Des 2026</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#edeef0] flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#9e001f] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    flight_takeoff
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[15px] font-bold text-[#191c1e] truncate">
                      DJI Mini 3 Pro + Helm K3 L2
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#edeef0] text-[#5c403f] text-[10px] font-semibold shrink-0">
                      Survei Site
                    </span>
                  </div>
                  <span className="text-[12px] text-[#515f74] block mt-0.5">
                    No. Aset: AST-SURV-2024-012
                  </span>
                  <span className="text-[11px] text-[#515f74] block mt-0.5">
                    Kalibrasi Sensor: Tersertifikasi
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAssetModalOpen(true)}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#f2f4f6] hover:bg-[#edeef0] text-[#191c1e] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-[#515f74]">
                handyman
              </span>
              <span>Lapor Kerusakan / Pengembalian Aset</span>
            </button>
          </section>

          {/* Logout & Version */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#ffdad6] hover:bg-[#ffdad6]/80 text-[#93000a] active:scale-[0.98] font-display text-[14px] font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Keluar dari Akun (Logout)</span>
            </button>
            <div className="flex flex-col items-center text-center mt-1">
              <span className="text-[11px] text-[#515f74] font-medium">
                ARIFINDOne Mobile Enterprise • v2.8.4
              </span>
              <span className="text-[10px] text-[#515f74]/75">
                Build 2026.11 • Hak Cipta Dilindungi Undang-Undang
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gate Turnstile QR Modal */}
      <ModalSheet
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        title="Pass Akses Gerbang Turnstile"
        subtitle="Tunjukkan QR Code ke scanner pos keamanan atau site"
      >
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-44 h-44 rounded-2xl bg-white border-2 border-[#edeef0] p-4 flex items-center justify-center shadow-sm">
            <svg className="w-full h-full text-[#191c1e]" fill="currentColor" viewBox="0 0 40 40">
              <rect fill="none" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="2" y="2" />
              <rect fill="currentColor" height="6" width="6" x="5" y="5" />
              <rect fill="none" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="26" y="2" />
              <rect fill="currentColor" height="6" width="6" x="29" y="5" />
              <rect fill="none" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="2" y="26" />
              <rect fill="currentColor" height="6" width="6" x="5" y="29" />
              <rect fill="currentColor" height="4" width="4" x="18" y="4" />
              <rect fill="currentColor" height="6" width="4" x="18" y="12" />
              <rect fill="currentColor" height="4" width="8" x="28" y="18" />
              <rect fill="currentColor" height="4" width="4" x="18" y="22" />
              <rect fill="currentColor" height="4" width="6" x="24" y="26" />
              <rect fill="currentColor" height="8" width="4" x="34" y="28" />
              <rect fill="currentColor" height="4" width="4" x="18" y="32" />
            </svg>
          </div>
          <p className="text-[12px] font-semibold text-[#191c1e]">
            Bayu Pratama, S.T. • NIK ARF-2019-082
          </p>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
            Akses Terotorisasi: Kantor Pusat &amp; Site Sidoarjo
          </span>
        </div>
      </ModalSheet>

      {/* Change Data Modal */}
      <ModalSheet
        open={changeDataModalOpen}
        onClose={() => setChangeDataModalOpen(false)}
        title="Ajukan Perubahan Data Pegawai"
        subtitle="Tiket akan diteruskan ke HCGA & Legal untuk verifikasi"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setChangeValue('');
            setChangeDataModalOpen(false);
            onShowToast('Tiket perubahan data berhasil dikirim ke HCGA');
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-[12px] font-medium text-[#515f74] block mb-1">
              Data yang Diperbarui
            </label>
            <select
              value={changeField}
              onChange={(e) => setChangeField(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px] text-[#191c1e]"
            >
              <option>Nomor Rekening Payroll</option>
              <option>Alamat Domisili</option>
              <option>Status Pernikahan / Tanggungan Pajak</option>
              <option>Nomor Kontak Darurat</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-medium text-[#515f74] block mb-1">
              Nilai Data Baru
            </label>
            <input
              type="text"
              required
              value={changeValue}
              onChange={(e) => setChangeValue(e.target.value)}
              placeholder="Masukkan rincian data terbaru..."
              className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px] text-[#191c1e]"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
          >
            Kirim Permohonan Perubahan
          </button>
        </form>
      </ModalSheet>

      {/* Asset Report Modal */}
      <ModalSheet
        open={assetModalOpen}
        onClose={() => setAssetModalOpen(false)}
        title="Lapor Kerusakan / Pengembalian Aset"
        subtitle="Tim IT & General Affairs akan memproses laporan Anda"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAssetIssue('');
            setAssetModalOpen(false);
            onShowToast('Laporan aset berhasil dicatat oleh Divisi GA & IT');
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-[12px] font-medium text-[#515f74] block mb-1">
              Pilih Aset Terdaftar
            </label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px] text-[#191c1e]"
            >
              <option>Lenovo ThinkPad P14s G4 (AST-IT-2023-044)</option>
              <option>Toyota Hilux Double Cab 4x4 (L 8920 AF)</option>
              <option>DJI Mini 3 Pro + Helm K3 L2 (AST-SURV-2024-012)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-medium text-[#515f74] block mb-1">
              Keterangan Kerusakan / Pengembalian
            </label>
            <textarea
              rows={3}
              required
              value={assetIssue}
              onChange={(e) => setAssetIssue(e.target.value)}
              placeholder="Jelaskan kondisi aset atau jadwal pengembalian..."
              className="w-full p-3 rounded-xl bg-[#f2f4f6] text-[13px] text-[#191c1e]"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
          >
            Kirim Laporan Aset
          </button>
        </form>
      </ModalSheet>

      {/* Password Modal */}
      <ModalSheet
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Ganti Kata Sandi Akun"
        subtitle="Minimal 8 karakter dengan kombinasi huruf dan angka"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPasswordModalOpen(false);
            onShowToast('Kata sandi akun ARIFINDOne berhasil diperbarui');
          }}
          className="space-y-3"
        >
          <input
            type="password"
            required
            placeholder="Kata sandi saat ini"
            className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px]"
          />
          <input
            type="password"
            required
            placeholder="Kata sandi baru"
            className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px]"
          />
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
          >
            Simpan Kata Sandi Baru
          </button>
        </form>
      </ModalSheet>

      {/* Info Modal */}
      <ModalSheet
        open={Boolean(infoSheet)}
        onClose={() => setInfoSheet(null)}
        title={infoSheet?.title || ''}
      >
        <p className="text-[13px] text-[#515f74] leading-relaxed">{infoSheet?.body}</p>
        <button
          type="button"
          onClick={() => setInfoSheet(null)}
          className="w-full h-11 rounded-xl bg-[#edeef0] text-[#191c1e] text-[13px] font-semibold"
        >
          Tutup
        </button>
      </ModalSheet>

      {/* Logout Confirm Modal */}
      <ModalSheet
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Keluar dari Akun ARIFINDOne?"
        subtitle="Sesi biometrik & token SSO Anda akan diakhiri dengan aman"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setLogoutModalOpen(false)}
            className="h-11 rounded-xl bg-[#edeef0] text-[#191c1e] text-[13px] font-semibold"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              setLogoutModalOpen(false);
              onShowToast('Sesi telah diakhiri dengan aman.');
              onNavigate('beranda');
            }}
            className="h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
          >
            Ya, Keluar
          </button>
        </div>
      </ModalSheet>
    </div>
  );
};
