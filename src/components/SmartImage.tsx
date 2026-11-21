import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function SmartImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-[#EFE7DA] flex flex-col items-center justify-center p-6 text-center text-[#6B5E54]"
      >
        <ImageOff className="w-6 h-6 mb-2 opacity-60" strokeWidth={1.5} />
        <span className="font-serif text-sm font-medium text-[#231F1D]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
