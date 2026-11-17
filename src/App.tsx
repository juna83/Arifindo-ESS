/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import { LayoutShell } from './components/LayoutShell';
import { NotificationsModal } from './components/NotificationsModal';
import {
  INITIAL_APPROVALS,
  INITIAL_ATTENDANCE,
  INITIAL_KPI_LIST,
  INITIAL_LETTERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PAYSLIPS,
  INITIAL_TICKETS,
} from './data/hrisData';
import { AbsensiScreen } from './screens/AbsensiScreen';
import { BerandaScreen } from './screens/BerandaScreen';
import { DokumenScreen } from './screens/DokumenScreen';
import { ManagerScreen } from './screens/ManagerScreen';
import { PengajuanScreen } from './screens/PengajuanScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import {
  ApprovalItem,
  AttendanceRecord,
  KpiMember,
  LeaveOrServiceTicket,
  NotificationItem,
  OfficialLetterItem,
  PayslipItem,
  PengajuanCategory,
  ScreenId,
} from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('beranda');
  const [pengajuanTab, setPengajuanTab] = useState<PengajuanCategory>('cuti');

  const [attendance, setAttendance] = useState<AttendanceRecord>(INITIAL_ATTENDANCE);
  const [announcementAck, setAnnouncementAck] = useState(false);
  const [tickets, setTickets] = useState<LeaveOrServiceTicket[]>(INITIAL_TICKETS);
  const [payslips, setPayslips] = useState<PayslipItem[]>(INITIAL_PAYSLIPS);
  const [letters, setLetters] = useState<OfficialLetterItem[]>(INITIAL_LETTERS);
  const [sopK3Confirmed, setSopK3Confirmed] = useState(false);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [kpiList, setKpiList] = useState<KpiMember[]>(INITIAL_KPI_LIST);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notifModalOpen, setNotifModalOpen] = useState(false);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3000);
  }, []);

  const handleNavigate = useCallback(
    (screen: ScreenId, subTab?: PengajuanCategory) => {
      setActiveScreen(screen);
      if (subTab) {
        setPengajuanTab(subTab);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const handleCompleteCheckOut = useCallback((timeStr: string) => {
    setAttendance((prev) => ({
      ...prev,
      checkOutTime: timeStr,
      checkOutStatus: 'Tercatat',
    }));
  }, []);

  const handleAddTicket = useCallback((ticket: LeaveOrServiceTicket) => {
    setTickets((prev) => [ticket, ...prev]);
  }, []);

  const handleCancelTicket = useCallback((id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: 'Dibatalkan', statusTone: 'danger' }
          : t
      )
    );
  }, []);

  const handleDownloadPayslip = useCallback(
    (id: string, fileName: string) => {
      setPayslips((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, downloadCount: p.downloadCount + 1 } : p
        )
      );
      showToast(`Mengunduh: ${fileName} (Tersimpan)`);
    },
    [showToast]
  );

  const handleAddLetter = useCallback((letter: OfficialLetterItem) => {
    setLetters((prev) => [letter, ...prev]);
  }, []);

  const handleResolveApproval = useCallback((id: string) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleUpdateKpiScore = useCallback((id: string, newScore: number) => {
    setKpiList((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              score: newScore,
              needsReview: false,
              badgeTone: newScore >= 90 ? 'exceed' : 'ontrack',
              badgeText: newScore >= 90 ? 'Melampaui Target' : 'Sesuai Target',
            }
          : m
      )
    );
  }, []);

  const handleMarkAllNotifRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const handleSelectNotification = useCallback(
    (notif: NotificationItem) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
      );
      handleNavigate(notif.targetScreen);
    },
    [handleNavigate]
  );

  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  return (
    <LayoutShell
      activeScreen={activeScreen}
      onNavigate={handleNavigate}
      pendingApprovalsCount={approvals.length}
      unreadNotificationsCount={unreadNotifCount}
      onOpenNotifications={() => setNotifModalOpen(true)}
    >
      {activeScreen === 'beranda' && (
        <BerandaScreen
          attendance={attendance}
          tickets={tickets}
          announcementAck={announcementAck}
          onToggleAnnouncementAck={() => setAnnouncementAck((prev) => !prev)}
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {activeScreen === 'absensi' && (
        <AbsensiScreen
          attendance={attendance}
          onCompleteCheckOut={handleCompleteCheckOut}
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {activeScreen === 'pengajuan' && (
        <PengajuanScreen
          activeCategory={pengajuanTab}
          onChangeCategory={setPengajuanTab}
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onCancelTicket={handleCancelTicket}
          onShowToast={showToast}
        />
      )}

      {activeScreen === 'dokumen' && (
        <DokumenScreen
          payslips={payslips}
          onDownloadPayslip={handleDownloadPayslip}
          letters={letters}
          onAddLetter={handleAddLetter}
          sopK3Confirmed={sopK3Confirmed}
          onConfirmSopK3={() => setSopK3Confirmed(true)}
          onShowToast={showToast}
        />
      )}

      {activeScreen === 'profil' && (
        <ProfilScreen onNavigate={handleNavigate} onShowToast={showToast} />
      )}

      {activeScreen === 'manager' && (
        <ManagerScreen
          approvals={approvals}
          onResolveApproval={handleResolveApproval}
          kpiList={kpiList}
          onUpdateKpiScore={handleUpdateKpiScore}
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      <NotificationsModal
        open={notifModalOpen}
        onClose={() => setNotifModalOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotifRead}
        onSelectNotification={handleSelectNotification}
      />

      {/* Global Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2.5 rounded-full bg-[#2e3132] text-[#f0f1f3] text-[12px] font-medium shadow-lg flex items-center gap-2 max-w-[90vw]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#b6ebff]">
            check_circle
          </span>
          <span className="truncate">{toastMsg}</span>
        </div>
      )}
    </LayoutShell>
  );
}
