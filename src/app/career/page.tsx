import { redirect } from 'next/navigation';

// Redirect non-locale /career to /en/career for consistency
export default function CareerRedirect() {
  redirect('/en/career');
}
