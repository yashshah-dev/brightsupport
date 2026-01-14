import { redirect } from 'next/navigation';

// Redirect non-locale /services/companionship to /en/services/companionship for consistency
export default function ServiceRedirect() {
    redirect('/en/services/companionship');
}

