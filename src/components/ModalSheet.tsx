import React, { useEffect } from 'react';

interface ModalSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const ModalSheet: React.FC<ModalSheetProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidthClass = 'max-w-md',
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/45 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`w-full ${maxWidthClass} rounded-t-3xl sm:rounded-2xl bg-white p-5 shadow-2xl flex flex-col gap-4 max-h-[88vh] overflow-y-auto border border-[#e8ebf0]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden w-10 h-1.5 bg-[#d9dadc] rounded-full mx-auto -mt-1 mb-1 shrink-0" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[17px] font-bold text-[#191c1e] leading-snug">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[12px] text-[#515f74] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#edeef0] hover:bg-[#e1e2e4] flex items-center justify-center text-[#515f74] hover:text-[#191c1e] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
