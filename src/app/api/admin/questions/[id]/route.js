import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { adminQuestionSchema } from "@/lib/validators";
import { deleteQuestion, upsertQuestion } from "@/lib/platform-data";

export async function PATCH(request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const payload = adminQuestionSchema.parse(await request.json());
    const question = await upsertQuestion(payload, params.id);
    return NextResponse.json({ success: true, question });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to update question." }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    await deleteQuestion(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to delete question." }, { status: 400 });
  }
}
