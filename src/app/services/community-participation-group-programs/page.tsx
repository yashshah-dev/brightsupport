import { redirect } from 'next/navigation';

// Redirect non-locale /services/community-participation-group-programs to /en/services/community-participation-group-programs for consistency
export default function ServiceRedirect() {
    redirect('/en/services/community-participation-group-programs');
}

