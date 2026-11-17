import {
  ApprovalItem,
  AttendanceRecord,
  KpiMember,
  LeaveOrServiceTicket,
  NotificationItem,
  OfficialLetterItem,
  PayslipItem,
  TeamPresenceMember,
} from '../types';

export const ASSETS = {
  logoPrimary:
    'https://lh3.googleusercontent.com/aida/ALJJyrAJ7HoT1aWOEc6oVKZqldaj1Dm4AP6v2zoIC5id-7vYSeJHwaQt0EoC31mAJ48TJoVtxv3jdHKF4qM3Tak0xJFjFcTO3ygCvLR1eXj1yUslKYhFY0csw8_rqVUyA9ha9fxDcCvs5R5PcnUkMU2gDaK-FJiIUtV1MxerAo7i4KQ0jBKd7EoPBM73xNotC5lva00Zq6UnGdp23HzaEWnh5PTP5Xxyf_RJ7SMKTjLPVG7m8GDxmkFUO2Hxyuwn',
  logoEmblem:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCWrlYiFD_Y0_uRDDbUnrZWeKTmF22i7_Kf19ZcE6zeQltvv550Q4prWlMWC9-sXSNDykwu8J1izpTmiSjiZ8TBJz1mjJSOfH7WLf6IMUwcqav6V_ZiFQfhtulYhX3WMoWrViX0mkr2jeGsBO32BtjLaQ0_tDdC5VVQirHja63mWEqySMarjXN20ndA1AZKvYOPtHOTYf-8fPW0TyMN_N1TBC0jUiIxH36LiZgWOmAYbuLxE-6PBNwTXA',
  profilePortrait:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKTzObxvgBz8VxSjMN6ZnLhLj1LlJabjNwk9TN0ae-UaG7xAOyOqiprH7pKyD01PPTO0ferVWvWjMS2J65b3VRQKiXfuHFr1o6xpJuGdkqqhMvMm0QDOm4TiVJoEo0pLqYmQgY0ZYYU8ThPcqoBHyFDOE0u2LpmVgPE2vy5Ek2tyOViCQQk4b9hulX8Mggk0XvNvAMGtHELA1g4ts1zbnBl7ScZNfLFZnGd6LLBA5B',
  cameraSelfie:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNBpHEcmQ2pD_oM0u7cAxl2WZgix-n3n48bUt4SfeQuTBmwSi1VNF2Nv_066e2Rz4ILD3eMZxOopw9XxpDtsuMA02VHtQAxvztHC51Wwt1Mfe33iaKF45pljP7FRbvYRv-BzzTCxf20e5L8gr0g2QZaRAHWyu6oCVvrWyJj9IoeAa1Zc2bQRzkXHKl7tMI4q_UiDfVF7YnVK6riOrEuOT73-y-JG6LBfXXh4Bq5M0k',
  doctorNote:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAaQq2KwARuiAv3XLfWCz2DXMap5C9K9ypVFIBRLitl2JVd2O43JDpELirx2eI3_nXwMCJ5kp7hQwLBkTZMlt1NJ_IPl3Yo4AARXom4ucXbenLKbmKAN_iVZQHSRyNdHRxS8wmHUrYreAZfN59-PmKDcNm_V6Mrof9J4p61VQkLBdLfh-vgAHZ_aEK9_8yWP7_Y8ZC49VE-oEgaqYp9bH346hylR9YEbwJqX0adcT6Z',
};

export const INITIAL_ATTENDANCE: AttendanceRecord = {
  dateLabel: 'Kamis, 26 November 2026',
  checkInTime: '07:52',
  checkInStatus: 'Tepat Waktu',
  checkOutTime: null,
  checkOutStatus: 'Belum',
  locationName: 'Proyek Grand Arifindo Sidoarjo',
  radiusMeters: 35,
  maxRadiusMeters: 100,
  shiftLabel: 'Shift Pagi (08:00 - 17:00)',
};

export const INITIAL_TICKETS: LeaveOrServiceTicket[] = [
  {
    id: '#CUT-202611-0042',
    category: 'cuti',
    title: 'Cuti Tahunan Standar (3 Hari)',
    subtitle: 'Periode: 02 - 04 Des 2026 • Pengajuan: 25 Nov 2026',
    dateRange: '02 - 04 Des 2026',
    status: 'Menunggu Approval HCGA',
    statusTone: 'warning',
    icon: 'event_busy',
    amountOrDays: '3 Hari Kerja',
    timeline: [
      {
        title: 'Pengajuan Oleh Karyawan',
        timestamp: '25 Nov • 14:10 WIB',
        actor: 'Bayu Pratama, S.T. (Terkirim via ESS Mobile)',
        status: 'done',
      },
      {
        title: 'Persetujuan Atasan Langsung',
        timestamp: 'Disetujui • 16:30',
        actor: 'Ir. Bambang Santoso (Project Manager Site Timur)',
        note: '"Pekerjaan slab lantai 3 sudah didelegasikan ke Doni. Pengajuan disetujui."',
        status: 'done',
      },
      {
        title: 'HCGA / HR Director Review',
        timestamp: 'Sedang Meninjau',
        actor: 'Budi Santoso, S.Psi., M.M. (Validasi Kuota Perusahaan)',
        status: 'active',
        statusBadge: 'Sedang Meninjau',
      },
      {
        title: 'Sinkronisasi Payroll & Kuota',
        timestamp: 'Menunggu Tahap 3',
        actor: 'Sistem Otomatisasi HRIS ARIFINDO',
        status: 'pending',
      },
    ],
  },
  {
    id: '#CLM-202611-0019',
    category: 'klaim',
    title: 'Reimbursement Transport',
    subtitle: 'Rp 450.000 • BBM Site Audit',
    dateRange: '24 Nov 2026',
    status: 'Disetujui Finance',
    statusTone: 'success',
    icon: 'receipt',
    amountOrDays: 'Rp 450.000',
  },
  {
    id: '#AST-202611-0008',
    category: 'atk',
    title: 'Alat Ukur Total Station',
    subtitle: 'Dikembalikan 24 Nov 2026',
    dateRange: '24 Nov 2026',
    status: 'Selesai',
    statusTone: 'neutral',
    icon: 'handyman',
  },
  {
    id: '#CUT-202608-0118',
    category: 'cuti',
    title: 'Cuti Bersama HUT Kemerdekaan RI',
    subtitle: '18 Agustus 2026 • Disetujui Penuh oleh Ir. Bambang Santoso',
    dateRange: '18 Agu 2026',
    status: 'Selesai',
    statusTone: 'neutral',
    icon: 'verified',
    amountOrDays: '1 Hari',
    canDownload: true,
  },
];

export const INITIAL_PAYSLIPS: PayslipItem[] = [
  {
    id: 'slip-nov-2026',
    monthLabel: 'November 2026',
    periodLabel: 'Periode: 26 Okt - 25 Nov 2026 • Proyek Sipil',
    takeHomePay: 'Rp 14.850.000',
    deductions: '- Rp 684.200',
    badgeText: 'Baru Terbit',
    badgeTone: 'new',
    downloadCount: 0,
    fileName: 'Slip_Gaji_Nov_2026.pdf',
  },
  {
    id: 'slip-okt-2026',
    monthLabel: 'Oktober 2026',
    periodLabel: 'Periode: 26 Sep - 25 Okt 2026',
    takeHomePay: 'Rp 14.850.000',
    deductions: '- Rp 684.200',
    badgeText: 'Terverifikasi HCGA',
    badgeTone: 'verified',
    downloadCount: 2,
    fileName: 'Slip_Gaji_Okt_2026.pdf',
  },
  {
    id: 'slip-sep-2026',
    monthLabel: 'September 2026',
    periodLabel: 'Periode: 26 Agu - 25 Sep 2026',
    takeHomePay: 'Rp 15.200.000',
    deductions: '- Rp 710.500',
    badgeText: 'Arsip',
    badgeTone: 'archive',
    downloadCount: 1,
    fileName: 'Slip_Gaji_Sep_2026.pdf',
  },
];

export const INITIAL_LETTERS: OfficialLetterItem[] = [
  {
    id: 'sk-038',
    title: 'Surat Keterangan Kerja Aktif',
    purpose: 'Keperluan: Pengajuan KPR BTN',
    docNumber: '038/ARF-HCGA/SK/XI/2026',
    issuedDate: '18 Nov 2026',
    signer: 'Budi Santoso (HCGA Dir.)',
    fileName: 'SK_Kerja_KPR_038_XI_2026.pdf',
  },
];

export const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 'card-cuti-1',
    category: 'cuti',
    initials: 'DP',
    avatarTone: 'secondary',
    employeeName: 'Doni Prasetyo, S.T.',
    roleTitle: 'Site Supervisor • ID #ENG-489',
    typeBadge: 'Cuti Tahunan',
    typeTone: 'secondary',
    detailLabel: 'Durasi Cuti:',
    detailValue: '04 - 05 Des 2026 (2 Hari)',
    description:
      'Alasan: "Urusan keluarga di Malang. Pendelegasian site diserahkan ke Hendra Kurniawan."',
    approveLabel: 'Setujui (2 Hari)',
  },
  {
    id: 'card-lembur-2',
    category: 'lembur',
    initials: 'AS',
    avatarTone: 'fixed',
    employeeName: 'Agus Setiawan',
    roleTitle: 'Mandor Sipil Lapangan • Tim 03',
    typeBadge: 'SPL Lembur',
    typeTone: 'tertiary',
    detailLabel: 'Waktu Pengajuan:',
    detailValue: 'Hari Ini (17:00 - 21:00 • 4 Jam)',
    description:
      'Pekerjaan: "Pengecoran slab lantai 3 tower timur bersama 6 orang mandor rekanan."',
    approveLabel: 'Validasi SPL',
  },
  {
    id: 'card-klaim-3',
    category: 'klaim',
    initials: 'RH',
    avatarTone: 'primary',
    employeeName: 'Rian Hidayat',
    roleTitle: 'Logistik Site & Pengadaan Armada',
    typeBadge: 'Reimbursement',
    typeTone: 'neutral',
    detailLabel: 'Deskripsi Biaya:',
    detailValue: 'Rp 450.000',
    description: 'BBM & Tol Truk Molen (2 Rit)',
    approveLabel: 'Setujui Klaim',
    hasReceipt: true,
  },
];

export const TEAM_PRESENCE_LIST: TeamPresenceMember[] = [
  {
    id: 'tm-1',
    initials: 'DP',
    name: 'Doni Prasetyo',
    role: 'Site Supervisor',
    statusType: 'present',
    statusBadge: '07:45 • Site',
  },
  {
    id: 'tm-2',
    initials: 'AS',
    name: 'Agus Setiawan',
    role: 'Mandor Sipil',
    statusType: 'present',
    statusBadge: '07:55 • Site',
  },
  {
    id: 'tm-3',
    initials: 'SR',
    name: 'Siti Rahmawati',
    role: 'Quality Control (QC)',
    statusType: 'present',
    statusBadge: '07:50 • Site',
  },
  {
    id: 'tm-4',
    initials: 'HK',
    name: 'Hendra Kurniawan',
    role: 'Drafter & BIM',
    statusType: 'leave',
    statusBadge: 'Izin Cuti (Disetujui)',
  },
  {
    id: 'tm-5',
    initials: 'DA',
    name: 'Dimas Ananda',
    role: 'Surveyor Site',
    statusType: 'missing',
    statusBadge: 'Belum Presensi • Notif Sent',
  },
];

export const FULL_TEAM_ROSTER: TeamPresenceMember[] = [
  ...TEAM_PRESENCE_LIST,
  { id: 'tm-6', initials: 'RH', name: 'Rian Hidayat', role: 'Logistik Site', statusType: 'present', statusBadge: '07:41 • Site' },
  { id: 'tm-7', initials: 'BW', name: 'Bagus Wicaksono', role: 'Safety Officer K3', statusType: 'present', statusBadge: '07:30 • Site' },
  { id: 'tm-8', initials: 'FA', name: 'Fajar Ramadhan', role: 'MEP Engineer', statusType: 'present', statusBadge: '07:58 • Site' },
  { id: 'tm-9', initials: 'NW', name: 'Nadia Wulandari', role: 'Site Admin', statusType: 'present', statusBadge: '07:49 • Site' },
  { id: 'tm-10', initials: 'YP', name: 'Yoga Pratama', role: 'Pelaksana Struktur', statusType: 'present', statusBadge: '07:53 • Site' },
  { id: 'tm-11', initials: 'MI', name: 'M. Ilham', role: 'Operator Crane', statusType: 'present', statusBadge: '07:38 • Site' },
  { id: 'tm-12', initials: 'RS', name: 'Rizky Saputra', role: 'Mandor Finishing', statusType: 'present', statusBadge: '07:56 • Site' },
  { id: 'tm-13', initials: 'AT', name: 'Andi Triyono', role: 'Teknisi Listrik', statusType: 'present', statusBadge: '07:51 • Site' },
  { id: 'tm-14', initials: 'EK', name: 'Eko Kurniawan', role: 'Warehouse Staff', statusType: 'present', statusBadge: '07:44 • Site' },
];

export const INITIAL_KPI_LIST: KpiMember[] = [
  {
    id: 'kpi-1',
    name: 'Doni Prasetyo',
    badgeText: 'Melampaui Target',
    badgeTone: 'exceed',
    score: 94.2,
  },
  {
    id: 'kpi-2',
    name: 'Agus Setiawan',
    badgeText: 'Sesuai Target',
    badgeTone: 'ontrack',
    score: 88.5,
  },
  {
    id: 'kpi-3',
    name: 'Rian Hidayat',
    badgeText: 'Butuh Review Lead',
    badgeTone: 'review',
    score: 81.0,
    needsReview: true,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '3 Pengajuan Tim Menunggu Persetujuan',
    message: 'Doni Prasetyo (Cuti), Agus Setiawan (SPL Lembur), dan Rian Hidayat (Klaim BBM).',
    timeAgo: '12 menit lalu',
    unread: true,
    targetScreen: 'manager',
    icon: 'approval',
  },
  {
    id: 'notif-2',
    title: 'Slip Gaji November 2026 Telah Terbit',
    message: 'Silakan unduh atau pratinjau slip gaji periode 26 Okt - 25 Nov 2026.',
    timeAgo: '2 jam lalu',
    unread: true,
    targetScreen: 'dokumen',
    icon: 'payments',
  },
  {
    id: 'notif-3',
    title: 'SOP K3 Konstruksi (Rev. 2026) Wajib Dibaca',
    message: 'Harap konfirmasi pemahaman protokol keselamatan lapangan sebelum 30 Nov 2026.',
    timeAgo: 'Kemarin',
    unread: false,
    targetScreen: 'dokumen',
    icon: 'warning',
  },
];
