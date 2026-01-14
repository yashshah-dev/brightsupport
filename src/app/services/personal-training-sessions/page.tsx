import { redirect } from 'next/navigation';

// Redirect non-locale /services/personal-training-sessions to /en/services/personal-training-sessions for consistency
export default function ServiceRedirect() {
    redirect('/en/services/personal-training-sessions');
}

