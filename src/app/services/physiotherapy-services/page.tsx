import { redirect } from 'next/navigation';

// Redirect non-locale /services/physiotherapy-services to /en/services/physiotherapy-services for consistency
export default function ServiceRedirect() {
    redirect('/en/services/physiotherapy-services');
}

