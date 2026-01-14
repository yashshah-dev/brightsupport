import { redirect } from 'next/navigation';

// Redirect non-locale /services/community-nursing-complex-care to /en/services/community-nursing-complex-care for consistency
export default function ServiceRedirect() {
    redirect('/en/services/community-nursing-complex-care');
}

