import React, { useState } from 'react';
import { ModalSheet } from '../components/ModalSheet';
import { FULL_TEAM_ROSTER, TEAM_PRESENCE_LIST } from '../data/hrisData';
import { ApprovalItem, KpiMember, ScreenId } from '../types';

interface ManagerScreenProps {
  approvals: ApprovalItem[];
  onResolveApproval: (id: string, decision: 'approved' | 'rejected') => void;
  kpiList: KpiMember[];
  onUpdateKpiScore: (id: string, newScore: number) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ManagerScreen: React.FC<ManagerScreenProps> = ({
  approvals,
  onResolveApproval,
  kpiList,
  onUpdateKpiScore,
  onNavigate,
  onShowToast,
}) => {
  const [filterCat, setFilterCat] = useState<'all' | 'cuti' | 'lembur' | 'klaim'>('all');
  const [feedbackMap, setFeedbackMap] = useState<
    Record<string, 'approved' | 'rejected'>
  >({});
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [workerModalOpen, setWorkerModalOpen] = useState(false);
  const [rosterModalOpen, setRosterModalOpen] = useState(false);
  const [editingKpi, setEditingKpi] = useState<KpiMember | null>(null);
  const [kpiScoreInput, setKpiScoreInput] = useState('85');
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [resolvedHistory, setResolvedHistory] = useState<
    { name: string; type: string; decision: 'approved' | 'rejected'; time: string }[]
  >([]);

  const handleAction = (item: ApprovalItem, decision: 'approved' | 'rejected') => {
    setFeedbackMap((prev) => ({ ...prev, [item.id]: decision }));
    setResolvedHistory((prev) => [
      {
        name: item.employeeName,
        type: item.typeBadge,
        decision,
        time: 'Baru saja',
      },
      ...prev,
    ]);
    setTimeout(() => {
      onResolveApproval(item.id, decision);
      onShowToast(
        decision === 'approved'
          ? `${item.typeBadge} ${item.employeeName} disetujui`
          : `${item.typeBadge} ${item.employeeName} ditolak`
      );
    }, 650);
  };

  const filteredApprovals = approvals.filter((a) =>
    filterCat === 'all' ? true : a.category === filterCat
  );

  const countByCat = (cat: 'cuti' | 'lembur' | 'klaim') =>
    approvals.filter((a) => a.category === cat).length;

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* Manager Header Context Card */}
      <section className="relative overflow-hidden rounded-xl bg-white p-4 shadow-xs border border-[#edeef0]">
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-[#9e001f]/5 pointer-events-none" />
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#0d1c2f] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            AKSES MANAGER / SUPERVISOR
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#515f74] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Site
            </span>
            <button
              type="button"
              onClick={() => onNavigate('profil')}
              className="text-[11px] font-semibold text-[#9e001f] hover:underline"
            >
              Profil Saya →
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="font-display text-[20px] font-bold text-[#191c1e] leading-tight">
              Bayu Pratama, S.T.
            </h1>
            <p className="text-[12px] text-[#515f74] mt-0.5">
              Site Lead · Project Coordinator
            </p>
            <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-lg bg-[#edeef0] text-[#191c1e] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#9e001f]">
                engineering
              </span>
              Divisi Teknik &amp; Konstruksi Proyek
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ffdad8] flex items-center justify-center text-[#9e001f] font-display font-bold text-[18px] shrink-0">
            BP
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#f2f4f6] rounded-lg p-2.5">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] text-[#515f74]">Anggota Tim</span>
            <span className="font-display text-[17px] font-bold text-[#191c1e] mt-0.5 tabular-nums">
              14
            </span>
            <span className="text-[10px] text-[#515f74]">Aktif di Lapangan</span>
          </div>
          <div className="flex flex-col items-center text-center relative">
            <span className="text-[11px] text-[#515f74]">Persetujuan</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="font-display text-[17px] font-bold text-[#9e001f] tabular-nums">
                {approvals.length}
              </span>
              {approvals.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#9e001f] animate-ping" />
              )}
            </div>
            <span className="px-1.5 py-0.2 rounded-full bg-[#9e001f] text-white text-[9px] font-semibold">
              {approvals.length > 0 ? 'Perlu Cepat' : 'Tuntas'}
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] text-[#515f74]">Presensi Hari Ini</span>
            <span className="font-display text-[17px] font-bold text-emerald-700 mt-0.5 tabular-nums">
              92.8%
            </span>
            <span className="text-[10px] text-emerald-800">12/14 Terverifikasi</span>
          </div>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <section className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setTaskModalOpen(true)}
          className="flex items-center justify-center gap-1.5 h-12 px-3 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white font-display text-[14px] font-bold shadow-xs active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add_task</span>
          <span>+ Beri Tugas</span>
        </button>
        <button
          type="button"
          onClick={() => setWorkerModalOpen(true)}
          className="flex items-center justify-center gap-1.5 h-12 px-3 rounded-xl bg-white border border-[#edeef0] text-[#9e001f] font-display text-[14px] font-bold shadow-xs hover:bg-[#f2f4f6] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          <span>+ Tenaga Kerja</span>
        </button>
      </section>

      {/* Desktop 2-Col Split for Approval Inbox & Team Presence/KPI */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-5">
        {/* Approval Inbox Section (6 cols) */}
        <section className="space-y-3 lg:col-span-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                Persetujuan Tim
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#9e001f] text-white text-[11px] font-semibold tabular-nums">
                {approvals.length} Perlu Review
              </span>
            </div>
            <button
              type="button"
              onClick={() => setHistoryModalOpen(true)}
              className="text-[12px] font-semibold text-[#9e001f] hover:underline"
            >
              Riwayat ({resolvedHistory.length})
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'all' as const, label: `Semua (${approvals.length})` },
              { id: 'cuti' as const, label: `Cuti (${countByCat('cuti')})` },
              { id: 'lembur' as const, label: `Lembur (${countByCat('lembur')})` },
              { id: 'klaim' as const, label: `Klaim (${countByCat('klaim')})` },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilterCat(chip.id)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors ${
                  filterCat === chip.id
                    ? 'bg-[#9e001f] text-white shadow-xs'
                    : 'bg-[#edeef0] text-[#5c403f] hover:bg-[#e7e8ea]'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Approval Cards */}
          <div className="space-y-2.5">
            {filteredApprovals.map((item) => {
              const resolved = feedbackMap[item.id];
              if (resolved) {
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-4 shadow-xs transition-all ${
                      resolved === 'approved'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">
                          {resolved === 'approved' ? 'check_circle' : 'cancel'}
                        </span>
                        <span className="font-display text-[13px] font-semibold">
                          {resolved === 'approved'
                            ? 'Pengajuan Telah Disetujui'
                            : 'Pengajuan Ditolak / Direvisi'}
                        </span>
                      </div>
                      <span className="text-[11px]">
                        {resolved === 'approved'
                          ? 'Tersinkron ke SAP HRIS'
                          : 'Notifikasi Terkirim'}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-white p-4 shadow-xs border border-[#edeef0] transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-[13px] font-bold shrink-0 ${
                          item.avatarTone === 'primary'
                            ? 'bg-[#e5bdbb]/30 text-[#9e001f]'
                            : 'bg-[#d5e3fd] text-[#0d1c2f]'
                        }`}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <h3 className="font-display text-[15px] font-bold text-[#191c1e] leading-snug">
                          {item.employeeName}
                        </h3>
                        <p className="text-[12px] text-[#515f74]">{item.roleTitle}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                        item.typeTone === 'tertiary'
                          ? 'bg-[#b6ebff] text-[#004e60]'
                          : 'bg-[#d5e3fd] text-[#0d1c2f]'
                      }`}
                    >
                      {item.typeBadge}
                    </span>
                  </div>

                  <div className="bg-[#f2f4f6] rounded-lg p-2.5 mb-3 space-y-1">
                    <div className="flex items-center justify-between text-[12px] text-[#191c1e]">
                      <span className="text-[#515f74]">{item.detailLabel}</span>
                      <span
                        className={`font-semibold ${
                          item.typeTone === 'tertiary' ? 'text-[#005468]' : ''
                        }`}
                      >
                        {item.detailValue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-[#5c403f] pt-0.5">
                      <span>{item.description}</span>
                      {item.hasReceipt && (
                        <button
                          type="button"
                          onClick={() =>
                            onShowToast('Membuka lampiran kwitansi BBM & Tol (1 berkas)')
                          }
                          className="inline-flex items-center gap-1 text-[11px] text-[#005468] underline shrink-0 ml-2"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            receipt_long
                          </span>
                          Kwitansi (1)
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAction(item, 'rejected')}
                      className="h-11 rounded-lg bg-[#edeef0] hover:bg-[#ffdad6] hover:text-[#93000a] text-[#191c1e] text-[12px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                      <span>Tolak</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(item, 'approved')}
                      className="h-11 rounded-lg bg-[#c8102e] hover:bg-[#9e001f] text-white text-[12px] font-semibold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      <span>{item.approveLabel}</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredApprovals.length === 0 && (
              <div className="rounded-xl bg-white p-6 text-center border border-[#edeef0] text-[13px] text-[#515f74]">
                Seluruh pengajuan pada kategori ini telah diproses.
              </div>
            )}
          </div>
        </section>

        {/* Right Column (6 cols): Monitoring Kehadiran Tim & Evaluasi KPI */}
        <div className="flex flex-col gap-5 lg:col-span-6">
          {/* Monitoring Kehadiran Tim Hari Ini */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Presensi Tim Hari Ini
                </h2>
                <p className="text-[12px] text-[#515f74]">
                  Kamis, 26 Nov 2026 • Geofence Project Site
                </p>
              </div>
              <span className="w-8 h-8 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#515f74]">
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 flex items-center justify-between">
                <span className="text-[11px] text-emerald-800 font-medium">Hadir</span>
                <span className="font-display text-[13px] text-emerald-800 font-bold tabular-nums">
                  12
                </span>
              </div>
              <div className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#d5e3fd] flex items-center justify-between">
                <span className="text-[11px] text-[#3a485c] font-medium">Cuti / Izin</span>
                <span className="font-display text-[13px] text-[#3a485c] font-bold tabular-nums">
                  1
                </span>
              </div>
              <div className="flex-1 px-2.5 py-1.5 rounded-lg bg-amber-50 flex items-center justify-between">
                <span className="text-[11px] text-amber-800 font-medium">Belum</span>
                <span className="font-display text-[13px] text-amber-800 font-bold tabular-nums">
                  1
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-xs border border-[#edeef0] space-y-3">
              {TEAM_PRESENCE_LIST.map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <div
                        className={`w-9 h-9 rounded-full font-display text-[12px] font-bold flex items-center justify-center ${
                          member.statusType === 'missing'
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : 'bg-[#e7e8ea] text-[#191c1e]'
                        }`}
                      >
                        {member.initials}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                          member.statusType === 'present'
                            ? 'bg-emerald-500'
                            : member.statusType === 'leave'
                            ? 'bg-[#515f74]'
                            : 'bg-amber-500'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-[#191c1e] leading-tight truncate">
                        {member.name}
                      </p>
                      <p className="text-[12px] text-[#515f74] truncate">{member.role}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                      member.statusType === 'present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : member.statusType === 'leave'
                        ? 'bg-[#d5e3fd] text-[#3a485c]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {member.statusBadge}
                  </span>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setRosterModalOpen(true)}
                className="w-full mt-2 h-11 rounded-lg bg-[#f2f4f6] text-[#9e001f] text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#edeef0] transition-colors"
              >
                <span>Lihat Detail Rekap Tim (14 Orang)</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </section>

          {/* Review & Evaluasi KPI Bawahan */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-[16px] font-bold text-[#191c1e]">
                  Evaluasi Kinerja Q4 2026
                </h2>
                <p className="text-[12px] text-[#515f74]">
                  Target Produktivitas &amp; Safety Konstruksi
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onShowToast('Seluruh skor KPI tim dikalibrasi dengan bobot HCGA')
                }
                className="text-[12px] font-semibold text-[#9e001f] flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Kalibrasi</span>
              </button>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-xs border border-[#edeef0] space-y-3.5">
              {kpiList.map((member) =>
                member.needsReview ? (
                  <div
                    key={member.id}
                    className="space-y-2 bg-[#f2f4f6] rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between gap-2 text-[12px]">
                      <div>
                        <span className="font-semibold text-[#191c1e]">
                          {member.name}
                        </span>
                        <p className="text-[11px] text-[#515f74] tabular-nums">
                          Skor Sementara: {member.score.toFixed(1)}% • {member.badgeText}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingKpi(member);
                          setKpiScoreInput(String(member.score));
                        }}
                        className="h-9 px-3 rounded-lg bg-[#c8102e] text-white text-[12px] font-semibold active:scale-95 transition-transform flex items-center gap-1 shrink-0"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          edit_note
                        </span>
                        <span>Input KPI</span>
                      </button>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#edeef0] overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${Math.min(100, member.score)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div key={member.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#191c1e]">
                          {member.name}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-medium ${
                            member.badgeTone === 'exceed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-[#d5e3fd] text-[#3a485c]'
                          }`}
                        >
                          {member.badgeText}
                        </span>
                      </div>
                      <span className="font-display font-bold text-[#191c1e] tabular-nums">
                        {member.score.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#edeef0] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          member.badgeTone === 'exceed'
                            ? 'bg-emerald-600'
                            : 'bg-[#515f74]'
                        }`}
                        style={{ width: `${Math.min(100, member.score)}%` }}
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  onShowToast('Panel kalibrasi Q4 2026 disinkronkan ke HCGA')
                }
                className="w-full h-11 rounded-lg bg-[#edeef0] text-[#191c1e] text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-[#e7e8ea] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">assessment</span>
                <span>+ Kalibrasi Seluruh Nilai Tim</span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Add Task Modal */}
      <ModalSheet
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Beri Tugas Proyek Baru"
        subtitle="Penugasan otomatis terkirim ke notifikasi anggota tim"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTaskModalOpen(false);
            onShowToast('Tugas lapangan baru telah dikirim ke Doni Prasetyo');
          }}
          className="space-y-3"
        >
          <input
            type="text"
            required
            placeholder="Judul tugas (contoh: Inspeksi Bekisting Lantai 4)"
            className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px]"
          />
          <select className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px]">
            <option>Doni Prasetyo, S.T. (Site Supervisor)</option>
            <option>Agus Setiawan (Mandor Sipil)</option>
            <option>Siti Rahmawati (Quality Control)</option>
          </select>
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
          >
            Kirim Penugasan
          </button>
        </form>
      </ModalSheet>

      {/* Add Worker Modal */}
      <ModalSheet
        open={workerModalOpen}
        onClose={() => setWorkerModalOpen(false)}
        title="Permintaan Tenaga Kerja Site"
        subtitle="Pengajuan alokasi SDM tambahan ke divisi HCGA"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setWorkerModalOpen(false);
            onShowToast('Permintaan tenaga kerja dikirim ke HCGA Recruitment');
          }}
          className="space-y-3"
        >
          <input
            type="text"
            required
            placeholder="Posisi dibutuhkan (contoh: Surveyor Lapangan)"
            className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px]"
          />
          <input
            type="number"
            min={1}
            defaultValue={2}
            className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[13px]"
          />
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
          >
            Ajukan ke HCGA
          </button>
        </form>
      </ModalSheet>

      {/* Full 14-Member Roster Modal */}
      <ModalSheet
        open={rosterModalOpen}
        onClose={() => setRosterModalOpen(false)}
        title="Rekap Presensi Tim (14 Orang)"
        subtitle="Proyek Grand Arifindo Sidoarjo • Shift Pagi"
      >
        <div className="space-y-2.5">
          {FULL_TEAM_ROSTER.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f4f6]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-[#191c1e] font-bold text-[11px] flex items-center justify-center border border-[#e8ebf0]">
                  {member.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#191c1e]">{member.name}</p>
                  <p className="text-[11px] text-[#515f74]">{member.role}</p>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  member.statusType === 'present'
                    ? 'bg-emerald-100 text-emerald-800'
                    : member.statusType === 'leave'
                    ? 'bg-[#d5e3fd] text-[#3a485c]'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {member.statusBadge}
              </span>
            </div>
          ))}
        </div>
      </ModalSheet>

      {/* Input KPI Score Modal */}
      <ModalSheet
        open={Boolean(editingKpi)}
        onClose={() => setEditingKpi(null)}
        title={`Input Evaluasi KPI: ${editingKpi?.name || ''}`}
        subtitle="Penilaian Kuartal Q4 2026"
      >
        {editingKpi && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const parsed = Math.min(100, Math.max(0, Number(kpiScoreInput) || 85));
              onUpdateKpiScore(editingKpi.id, parsed);
              setEditingKpi(null);
              onShowToast(`Skor KPI ${editingKpi.name} diperbarui ke ${parsed.toFixed(1)}%`);
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-[12px] font-medium text-[#515f74] block mb-1">
                Skor Kinerja (0 - 100%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={kpiScoreInput}
                onChange={(e) => setKpiScoreInput(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[14px] font-bold"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#c8102e] text-white text-[13px] font-semibold"
            >
              Simpan Nilai KPI
            </button>
          </form>
        )}
      </ModalSheet>

      {/* Approval History Modal */}
      <ModalSheet
        open={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        title="Riwayat Persetujuan Sesi Ini"
      >
        {resolvedHistory.length === 0 ? (
          <p className="text-[13px] text-[#515f74] py-4 text-center">
            Belum ada pengajuan yang diproses pada sesi ini.
          </p>
        ) : (
          <div className="space-y-2">
            {resolvedHistory.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#f2f4f6] flex items-center justify-between text-[12px]"
              >
                <div>
                  <p className="font-semibold text-[#191c1e]">{h.name}</p>
                  <p className="text-[#515f74]">{h.type}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold ${
                    h.decision === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}
                >
                  {h.decision === 'approved' ? 'Disetujui' : 'Ditolak'}
                </span>
              </div>
            ))}
          </div>
        )}
      </ModalSheet>
    </div>
  );
};
