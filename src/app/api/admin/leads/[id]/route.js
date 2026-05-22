import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { updateDemoBookingStatus } from "@/lib/platform-data";
import { leadStatusSchema } from "@/lib/validators";

export async function PATCH(request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const json = await request.json();
    const payload = leadStatusSchema.parse(json);
    const lead = await updateDemoBookingStatus(params.id, payload.status);
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to update lead status." }, { status: 400 });
  }
}
