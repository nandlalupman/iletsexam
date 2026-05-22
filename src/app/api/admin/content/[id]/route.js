import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { contentBlockSchema } from "@/lib/validators";
import { deleteContentBlock, upsertContentBlock } from "@/lib/platform-data";

export async function PATCH(request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const payload = contentBlockSchema.parse(await request.json());
    const block = await upsertContentBlock(payload, params.id);
    return NextResponse.json({ success: true, block });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to update content." }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    await deleteContentBlock(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to delete content." }, { status: 400 });
  }
}
