'use client';

import { useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';

const NON_CRITICAL_STYLES_ID = 'non-critical-stylesheet';

export default function NonCriticalStylesLoader() {
  useEffect(() => {
    if (document.getElementById(NON_CRITICAL_STYLES_ID)) return;

    const link = document.createElement('link');
    link.id = NON_CRITICAL_STYLES_ID;
    link.rel = 'stylesheet';
    link.href = getAssetPath('/styles/non-critical.css');
    document.head.appendChild(link);
  }, []);

  return null;
}
