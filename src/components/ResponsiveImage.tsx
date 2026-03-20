import React from 'react';
import { getAssetPath } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string; // original base image path (e.g. /images/hero/hero-main.webp)
  alt: string;
  widths?: number[]; // optional override widths
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean; // if true set fetchPriority="high"
  width?: number; // fallback <img> width attribute
  height?: number; // fallback <img> height attribute
  disableResponsive?: boolean; // skip srcset Generation for single-format assets
}

// Default responsive breakpoints we generate variants for
const DEFAULT_WIDTHS = [480, 768, 1024, 1400];

// Given /images/hero/hero-main.webp -> returns { base: '/images/hero/hero-main', ext: 'webp' }
function splitSrc(src: string) {
  const lastDot = src.lastIndexOf('.');
  if (lastDot === -1) return { base: src, ext: '' };
  return { base: src.substring(0, lastDot), ext: src.substring(lastDot + 1) };
}

export function ResponsiveImage({
  src,
  alt,
  widths = DEFAULT_WIDTHS,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  loading = 'lazy',
  priority = false,
  width,
  height,
  disableResponsive,
}: ResponsiveImageProps) {
  const { base, ext } = splitSrc(src);
  const fallbackSrc = getAssetPath(src);

  // fetchPriority only if priority true (avoid invalid attribute on some browsers otherwise)
  const fetchPriority = priority ? 'high' : undefined;

  if (disableResponsive) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority as any}
        className={className}
        sizes={sizes}
        width={width}
        height={height}
      />
    );
  }

  // Build srcset strings for avif and webp variants
  const avifSet = widths
    .map(w => `${getAssetPath(`${base}-${w}.avif`)} ${w}w`)
    .join(', ');

  const webpSet = widths
    .map(w => `${getAssetPath(`${base}-${w}.webp`)} ${w}w`)
    .join(', ');

  return (
    <picture>
      {/* Modern AVIF format */}
      <source type="image/avif" srcSet={avifSet} sizes={sizes} />
      {/* WebP variants */}
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      {/* Fallback original image */}
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority as any}
        className={className}
        sizes={sizes}
        width={width}
        height={height}
      />
    </picture>
  );
}

export default ResponsiveImage;
