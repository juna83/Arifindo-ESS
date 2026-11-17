import React, { useEffect, useState } from 'react';
import { ASSETS } from '../data/hrisData';
import { AttendanceRecord, PengajuanCategory, ScreenId } from '../types';

interface AbsensiScreenProps {
  attendance: AttendanceRecord;
  onCompleteCheckOut: (timeStr: string) => void;
  onNavigate: (screen: ScreenId, pengajuanTab?: PengajuanCategory) => void;
  onShowToast: (msg: string) => void;
}

export const AbsensiScreen: React.FC<AbsensiScreenProps> = ({
  attendance,
  onCompleteCheckOut,
  onNavigate,
  onShowToast,
}) => {
  const [clockText, setClockText] = useState('09:01:50 WIB');
  const [flashOn, setFlashOn] = useState(false);
  const [camFlipped, setCamFlipped] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'validating' | 'success'>('idle');
  const [lastToken, setLastToken] = useState('ESS-20261126-7881');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setClockText(`${hrs}:${mins}:${secs} WIB`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmitPresensi = () => {
    if (submitState === 'validating') return;
    setSubmitState('validating');
    setTimeout(() => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;
      const randomToken = `ESS-20261126-${Math.floor(7882 + Math.random() * 1900)}`;
      setLastToken(randomToken);
      setSubmitState('success');
      onCompleteCheckOut(hhmm);
      onShowToast(`Presensi pulang dicatat pukul ${hhmm} WIB`);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-5 select-none">
      {/* Left Column: Status + Camera Viewport (6 cols on desktop) */}
      <div className="flex flex-col gap-4 lg:col-span-6">
        {/* Status Context Bar */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <h1 className="font-display text-[22px] leading-[28px] font-extrabold text-[#191c1e] tracking-tight">
                Verifikasi Presensi
              </h1>
              <p className="text-[12px] text-[#515f74] flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c8102e]" />
                <span>
                  {attendance.checkOutTime ? 'Absen Pulang Selesai' : 'Absen Pulang'} •{' '}
                  {attendance.locationName}
                </span>
              </p>
            </div>
            <div className="flex items-center bg-[#edeef0] px-2.5 py-1 rounded-full gap-1.5 shadow-xs shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[12px] text-[#5c403f] font-medium tabular-nums">
                {clockText}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#f2f4f6] px-3 py-1.5 rounded-lg flex-wrap">
            <span className="material-symbols-outlined text-[16px] text-[#005468]">
              calendar_today
            </span>
            <span className="text-[12px] text-[#515f74]">{attendance.dateLabel}</span>
            <span className="text-[#e5bdbb] text-[12px]">•</span>
            <span className="text-[12px] text-[#005468] font-semibold">
              {attendance.shiftLabel}
            </span>
          </div>
        </section>

        {/* Live Camera Viewport Area */}
        <section className="relative w-full h-[330px] lg:h-[380px] rounded-2xl overflow-hidden bg-[#2e3132] shadow-md flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 ${
              flashOn ? 'opacity-100 brightness-110' : 'opacity-85'
            } ${camFlipped ? '-scale-x-100' : ''}`}
            style={{ backgroundImage: `url('${ASSETS.cameraSelfie}')` }}
            role="img"
            aria-label="Pratinjau kamera verifikasi wajah"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e3132]/85 via-transparent to-[#2e3132]/65" />

          {/* Framing Corner Brackets */}
          <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-md" />
              <div className="w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
            </div>
            <div className="flex justify-between items-end">
              <div className="w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
              <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-md" />
            </div>
          </div>

          {/* Oval Biometric Face Guide */}
          <div className="relative w-44 h-56 rounded-[50%] border-2 border-emerald-400/90 shadow-[0_0_24px_rgba(16,185,129,0.35)] flex flex-col items-center justify-between py-2 pointer-events-none">
            <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-pulse mt-4" />
            <div className="bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="text-[12px] font-semibold tracking-wide">
                Wajah Cocok 98%
              </span>
            </div>
            <div className="bg-[#2e3132]/85 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[12px] text-emerald-300 font-medium">
                Liveness Verified
              </span>
            </div>
          </div>

          {/* Top Camera Micro Controls Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 bg-[#2e3132]/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[#f0f1f3]">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                wb_incandescent
              </span>
              <span className="text-[12px] text-[#f8f9fb]">
                {flashOn ? 'Flash Aktif' : 'Pencahayaan Baik'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFlashOn((prev) => !prev)}
                aria-label="Toggle Flashlight"
                className={`w-10 h-10 rounded-full bg-[#2e3132]/75 backdrop-blur-md flex items-center justify-center hover:bg-[#2e3132]/90 active:scale-95 transition-all ${
                  flashOn ? 'text-yellow-400' : 'text-[#f0f1f3]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {flashOn ? 'flash_on' : 'flash_off'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setCamFlipped((prev) => !prev)}
                aria-label="Switch Camera Lens"
                className={`w-10 h-10 rounded-full bg-[#2e3132]/75 backdrop-blur-md text-[#f0f1f3] flex items-center justify-center hover:bg-[#2e3132]/90 active:scale-95 transition-all ${
                  camFlipped ? 'rotate-180' : ''
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  flip_camera_ios
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Guide Tip Pill */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-center pointer-events-none">
            <div className="bg-[#2e3132]/80 backdrop-blur-md text-[#f8f9fb] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[15px] text-[#b6ebff]">
                center_focus_strong
              </span>
              <span className="text-[12px] font-medium">
                Sudut Optimal • Pertahankan Posisi
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Audit Checklist + Receipt + Actions (6 cols on desktop) */}
      <div className="flex flex-col gap-4 lg:col-span-6 lg:justify-between">
        {/* Security Verification Checklist (3 Pillars) */}
        <section className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#edeef0] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#9e001f] text-[18px]">
                security
              </span>
              <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                Audit Keamanan &amp; Integritas
              </h2>
            </div>
            <span className="text-[12px] text-[#515f74] font-medium">Auto-check 3/3</span>
          </div>

          <div className="flex items-start gap-2.5 bg-[#f2f4f6]/80 p-2.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined fill-icon text-emerald-700 text-[18px]">
                check_circle
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] text-[#191c1e] font-semibold truncate">
                  Lokasi dalam Radius
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 tabular-nums">
                  {attendance.radiusMeters}m / {attendance.maxRadiusMeters}m
                </span>
              </div>
              <p className="text-[12px] text-[#515f74] mt-0.5 leading-snug">
                Terdeteksi di zona Proyek Grand Arifindo Sidoarjo (-7.4478, 112.7183). Toleransi geofencing terpenuhi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#f2f4f6]/80 p-2.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined fill-icon text-emerald-700 text-[18px]">
                check_circle
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] text-[#191c1e] font-semibold truncate">
                  Sinkronisasi Jam NTP
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                  Deviasi 0.0s
                </span>
              </div>
              <p className="text-[12px] text-[#515f74] mt-0.5 leading-snug">
                Terenkripsi server time PT. Arifindo Adiputra Ariaguna. Modul anti-fake GPS dan mock location aktif.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#f2f4f6]/80 p-2.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined fill-icon text-emerald-700 text-[18px]">
                check_circle
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] text-[#191c1e] font-semibold truncate">
                  Koneksi &amp; Sertifikat Digital
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                  4G Terenkripsi
                </span>
              </div>
              <p className="text-[12px] text-[#515f74] mt-0.5 leading-snug">
                Jaringan stabil, handshake TLS 1.3 siap mentransmisikan token biometrik wajah ke ARIFINDOne Cloud.
              </p>
            </div>
          </div>
        </section>

        {/* Digital Audit Micro-Receipt Preview */}
        <div className="rounded-xl p-3 bg-[#f2f4f6] border border-[#e8ebf0] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-xs text-[#9e001f] shrink-0">
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold text-[#191c1e] truncate">
                Token ID: {lastToken}
              </span>
              <span className="text-[11px] text-[#515f74] truncate">
                Operator: Bayu Pratama, S.T. (NIK: ARF-2019-082)
              </span>
            </div>
          </div>
          <span className="text-[12px] text-[#005468] bg-[#b6ebff] px-2.5 py-0.5 rounded font-semibold shrink-0">
            Valid
          </span>
        </div>

        {/* Primary Docked Action Container */}
        <section className="flex flex-col gap-2.5">
          <button
            type="button"
            disabled={submitState === 'validating'}
            onClick={handleSubmitPresensi}
            className={`w-full min-h-[52px] text-white rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] ${
              submitState === 'success'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#c8102e] hover:bg-[#9e001f]'
            }`}
          >
            {submitState === 'validating' ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Memvalidasi Token...</span>
              </>
            ) : submitState === 'success' ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Presensi Berhasil Dicatat! ({attendance.checkOutTime} WIB)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                <span>Kirim Presensi Sekarang</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pengajuan', 'dinas')}
            className="w-full min-h-[44px] bg-white border border-[#edeef0] text-[#515f74] rounded-xl text-[12px] flex items-center justify-center gap-1.5 px-3 hover:text-[#191c1e] active:bg-[#edeef0] transition-colors shadow-xs text-center"
          >
            <span className="material-symbols-outlined text-[16px] text-[#9e001f]">
              wrong_location
            </span>
            <span>Di luar radius proyek?</span>
            <span className="font-semibold text-[#9e001f] underline underline-offset-2">
              Ajukan Izin / Dinas Luar
            </span>
          </button>
        </section>
      </div>
    </div>
  );
};
