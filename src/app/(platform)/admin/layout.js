import AdminShell from "@/components/platform/AdminShell";
import { requireAdminAccess } from "@/lib/access-control";

export default async function AdminLayout({ children }) {
  await requireAdminAccess();
  return <AdminShell>{children}</AdminShell>;
}
