import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { upsertTest } from "@/lib/platform-data";
import { adminTestSchema } from "@/lib/validators";

export async function PATCH(request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const json = await request.json();
    const payload = adminTestSchema.parse(json);
    const test = await upsertTest(payload, params.id);
    return NextResponse.json({ success: true, test });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to update test." }, { status: 400 });
  }
}
