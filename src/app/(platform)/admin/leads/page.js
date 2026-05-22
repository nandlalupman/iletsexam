import AdminLeadsManager from "@/components/platform/AdminLeadsManager";
import { getDemoBookings } from "@/lib/platform-data";

export default async function AdminLeadsPage() {
  const leads = await getDemoBookings();

  return <AdminLeadsManager initialLeads={leads} />;
}
