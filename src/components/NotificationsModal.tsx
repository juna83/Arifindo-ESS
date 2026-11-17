import React from 'react';
import { NotificationItem, ScreenId } from '../types';
import { ModalSheet } from './ModalSheet';

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  open,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <ModalSheet
      open={open}
      onClose={onClose}
      title="Pusat Notifikasi"
      subtitle={`${unreadCount} notifikasi belum dibaca`}
    >
      <div className="flex flex-col gap-2.5">
        {unreadCount > 0 && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-[12px] font-semibold text-[#c8102e] hover:underline px-2 py-1"
            >
              Tandai semua sudah dibaca
            </button>
          </div>
        )}

        {notifications.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSelectNotification(item);
              onClose();
            }}
            className={`text-left w-full p-3.5 rounded-xl border transition-colors flex items-start gap-3 ${
              item.unread
                ? 'bg-[#fdeef0]/60 border-[#e5bdbb]'
                : 'bg-[#f8f9fb] border-[#e8ebf0] hover:bg-[#f2f4f6]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                item.unread
                  ? 'bg-[#c8102e] text-white'
                  : 'bg-[#edeef0] text-[#515f74]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">
                {item.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[13px] font-bold text-[#191c1e] leading-snug">
                  {item.title}
                </span>
                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#c8102e] shrink-0 mt-1.5" />
                )}
              </div>
              <p className="text-[12px] text-[#515f74] mt-0.5 leading-relaxed">
                {item.message}
              </p>
              <span className="text-[11px] text-[#64748b] mt-1 block">
                {item.timeAgo}
              </span>
            </div>
          </button>
        ))}

        {notifications.length === 0 && (
          <div className="py-8 text-center text-[13px] text-[#515f74]">
            Tidak ada notifikasi saat ini.
          </div>
        )}
      </div>
    </ModalSheet>
  );
};
