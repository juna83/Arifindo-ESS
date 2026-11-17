import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: string;
  fallbackLabel?: string;
  fallbackClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIcon = 'image',
  fallbackLabel,
  fallbackClassName = 'bg-[#edeef0] text-[#515f74]',
  ...rest
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 select-none ${fallbackClassName} ${className}`}
        role="img"
        aria-label={alt || fallbackLabel || 'Image placeholder'}
      >
        <span className="material-symbols-outlined text-[24px]">{fallbackIcon}</span>
        {fallbackLabel && (
          <span className="text-[10px] font-semibold tracking-tight px-1 text-center leading-tight">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
};
