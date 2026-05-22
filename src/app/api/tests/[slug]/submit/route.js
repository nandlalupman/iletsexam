import { NextResponse } from "next/server";
import { getCurrentAccess } from "@/lib/access-control";
import { getTestBySlug, scoreReadingSubmission } from "@/lib/platform-data";

export async function POST(request, { params }) {
  const test = await getTestBySlug(params.slug);

  if (!test) {
    return NextResponse.json({ message: "Test not found." }, { status: 404 });
  }

  const { answers = {} } = await request.json();
  const access = await getCurrentAccess();
  const result = await scoreReadingSubmission(answers, access);

  return NextResponse.json({
    success: true,
    result,
  });
}
