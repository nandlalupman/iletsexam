import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { getTests, upsertTest } from "@/lib/platform-data";
import { adminTestSchema } from "@/lib/validators";

export async function GET() {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  const tests = await getTests();
  return NextResponse.json({ tests });
}

export async function POST(request) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const json = await request.json();
    const payload = adminTestSchema.parse(json);
    const test = await upsertTest(payload);
    return NextResponse.json({ success: true, test });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to save test." }, { status: 400 });
  }
}
