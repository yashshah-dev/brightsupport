import { redirect } from "next/navigation";

// Server-side redirect: Googlebot and all crawlers see an immediate HTTP redirect
// instead of a blank page waiting for client-side JS to execute.
export default function RootPage() {
  redirect("/en");
}
