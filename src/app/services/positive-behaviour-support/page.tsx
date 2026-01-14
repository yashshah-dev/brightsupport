import { redirect } from 'next/navigation';

// Redirect non-locale /services/positive-behaviour-support to /en/services/positive-behaviour-support for consistency
export default function ServiceRedirect() {
    redirect('/en/services/positive-behaviour-support');
}

