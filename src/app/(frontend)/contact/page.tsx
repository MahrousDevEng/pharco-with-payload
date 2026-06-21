import { pageMeta } from "@/lib/seo";
import ContactView from "@/features/contact/ContactView";

export const metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with Pharco Corporation — one enquiry form routed to the right team for partnerships, media, careers, and general questions.",
})

export default function ContactPage() {
  return <ContactView />;
}
