import { redirect } from 'next/navigation';

// Redirect non-locale /contact-us to /en/contact-us for consistency
export default function ContactUsRedirect() {
  redirect('/en/contact-us');
}
