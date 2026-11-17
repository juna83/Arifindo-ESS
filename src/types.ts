export type ScreenId =
  | 'beranda'
  | 'absensi'
  | 'pengajuan'
  | 'dokumen'
  | 'profil'
  | 'manager';

export type PengajuanCategory =
  | 'cuti'
  | 'lembur'
  | 'klaim'
  | 'kasbon'
  | 'koreksi'
  | 'dinas'
  | 'atk'
  | 'resign';

export interface AttendanceRecord {
  dateLabel: string;
  checkInTime: string;
  checkInStatus: string;
  checkOutTime: string | null;
  checkOutStatus: string;
  locationName: string;
  radiusMeters: number;
  maxRadiusMeters: number;
  shiftLabel: string;
}

export interface TimelineStep {
  title: string;
  timestamp: string;
  actor: string;
  note?: string;
  status: 'done' | 'active' | 'pending';
  statusBadge?: string;
}

export interface LeaveOrServiceTicket {
  id: string;
  category: PengajuanCategory;
  title: string;
  subtitle: string;
  dateRange: string;
  status: 'Menunggu Approval HCGA' | 'Disetujui Finance' | 'Selesai' | 'Dibatalkan';
  statusTone: 'warning' | 'success' | 'neutral' | 'danger';
  icon: string;
  timeline?: TimelineStep[];
  canDownload?: boolean;
  amountOrDays?: string;
}

export interface PayslipItem {
  id: string;
  monthLabel: string;
  periodLabel: string;
  takeHomePay: string;
  deductions: string;
  badgeText: string;
  badgeTone: 'new' | 'verified' | 'archive';
  downloadCount: number;
  fileName: string;
}

export interface OfficialLetterItem {
  id: string;
  title: string;
  purpose: string;
  docNumber: string;
  issuedDate: string;
  signer: string;
  fileName: string;
}

export interface ApprovalItem {
  id: string;
  category: 'cuti' | 'lembur' | 'klaim';
  initials: string;
  avatarTone: 'secondary' | 'fixed' | 'primary';
  employeeName: string;
  roleTitle: string;
  typeBadge: string;
  typeTone: 'secondary' | 'tertiary' | 'neutral';
  detailLabel: string;
  detailValue: string;
  description: string;
  approveLabel: string;
  hasReceipt?: boolean;
}

export interface TeamPresenceMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  statusType: 'present' | 'leave' | 'missing';
  statusBadge: string;
}

export interface KpiMember {
  id: string;
  name: string;
  badgeText: string;
  badgeTone: 'exceed' | 'ontrack' | 'review';
  score: number;
  needsReview?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  targetScreen: ScreenId;
  icon: string;
}
