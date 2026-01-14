import { redirect } from 'next/navigation';

// Redirect non-locale /services/travel-transport-assistance to /en/services/travel-transport-assistance for consistency
export default function ServiceRedirect() {
    redirect('/en/services/travel-transport-assistance');
}

