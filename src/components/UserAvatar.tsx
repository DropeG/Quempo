'use client';

import { useState, useEffect } from 'react';

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  email?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES = {
  xs: 'w-7 h-7 text-[10px] rounded-full',
  sm: 'w-9 h-9 text-sm rounded-xl',
  md: 'w-10.5 h-10.5 text-sm rounded-full',
  lg: 'w-12 h-12 text-base rounded-full',
  xl: 'w-14 h-14 sm:w-16 sm:h-16 text-xl rounded-2xl',
};

export default function UserAvatar({
  src,
  name,
  email,
  size = 'md',
  className = '',
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  const initial = (name?.trim() || email?.trim() || '?').charAt(0).toUpperCase();
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  if (src && !imageError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name || 'Avatar de usuario'}
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
        className={`${sizeClass} ring-2 ring-white/70 object-cover shrink-0 shadow-sm ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} bg-white text-[#0F2942] flex items-center justify-center font-black ring-2 ring-white/70 shrink-0 shadow-xs ${className}`}
    >
      {initial}
    </div>
  );
}
