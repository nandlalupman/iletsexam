import AdminSeoManager from "@/components/platform/AdminSeoManager";
import { getSeoPages } from "@/lib/platform-data";

export default async function AdminSeoPage() {
  const pages = await getSeoPages();

  return <AdminSeoManager initialPages={pages} />;
}
