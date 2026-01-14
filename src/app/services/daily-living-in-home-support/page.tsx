import { redirect } from 'next/navigation';

// Redirect non-locale /services/daily-living-in-home-support to /en/services/daily-living-in-home-support for consistency
export default function ServiceRedirect() {
    redirect('/en/services/daily-living-in-home-support');
}

