import { redirect } from 'next/navigation';

// Redirect non-locale /services/independent-living-accommodation-support to /en/services/independent-living-accommodation-support for consistency
export default function ServiceRedirect() {
    redirect('/en/services/independent-living-accommodation-support');
}

