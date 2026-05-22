import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { adminQuestionSchema } from "@/lib/validators";
import { getQuestions, upsertQuestion } from "@/lib/platform-data";

export async function GET() {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  const questions = await getQuestions();
  return NextResponse.json({ questions });
}

export async function POST(request) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const payload = adminQuestionSchema.parse(await request.json());
    const question = await upsertQuestion(payload);
    return NextResponse.json({ success: true, question });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to save question." }, { status: 400 });
  }
}
