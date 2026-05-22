import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { isDatabaseReady, seedCorePlatformData } from "@/lib/platform-data";

export async function GET() {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  const ready = await isDatabaseReady();
  return NextResponse.json({ ready });
}

export async function POST() {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const result = await seedCorePlatformData();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to seed platform data." }, { status: 400 });
  }
}
