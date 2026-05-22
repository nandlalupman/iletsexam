import AdminContentManager from "@/components/platform/AdminContentManager";
import { getContentBlocks } from "@/lib/platform-data";

export default async function AdminContentPage() {
  const blocks = await getContentBlocks();

  return <AdminContentManager initialBlocks={blocks} />;
}
