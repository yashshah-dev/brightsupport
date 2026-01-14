import { redirect } from 'next/navigation';

// Redirect non-locale /our-services to /en/our-services for consistency
export default function OurServicesRedirect() {
  redirect('/en/our-services');
}
