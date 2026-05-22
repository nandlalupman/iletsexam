import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { getSiteSettings, upsertSiteSettings } from "@/lib/platform-data";
import { siteSettingsSchema } from "@/lib/validators";

export async function GET() {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const payload = siteSettingsSchema.parse(await request.json());
    const settings = await upsertSiteSettings(payload);
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to save settings." }, { status: 400 });
  }
}
