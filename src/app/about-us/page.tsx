import { redirect } from 'next/navigation';

// Redirect non-locale /about-us to /en/about-us for consistency
export default function AboutUsRedirect() {
  redirect('/en/about-us');
}
