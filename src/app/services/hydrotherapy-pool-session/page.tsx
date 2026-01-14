import { redirect } from 'next/navigation';

// Redirect non-locale /services/hydrotherapy-pool-session to /en/services/hydrotherapy-pool-session for consistency
export default function ServiceRedirect() {
    redirect('/en/services/hydrotherapy-pool-session');
}

