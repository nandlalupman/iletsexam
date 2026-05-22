import AdminSettingsManager from "@/components/platform/AdminSettingsManager";
import { getSiteSettings } from "@/lib/platform-data";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return <AdminSettingsManager initialSettings={settings} />;
}
