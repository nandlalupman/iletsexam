import AdminTestsManager from "@/components/platform/AdminTestsManager";
import { getTests } from "@/lib/platform-data";

export default async function AdminTestsPage() {
  const tests = await getTests();

  return <AdminTestsManager initialTests={tests} />;
}
