import { redirect } from 'next/navigation';

// Redirect non-locale /services/professional-cleaning to /en/services/professional-cleaning for consistency
export default function ServiceRedirect() {
    redirect('/en/services/professional-cleaning');
}

