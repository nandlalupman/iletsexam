import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { contentBlockSchema } from "@/lib/validators";
import { getContentBlocks, upsertContentBlock } from "@/lib/platform-data";

export async function GET() {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  const blocks = await getContentBlocks();
  return NextResponse.json({ blocks });
}

export async function POST(request) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const payload = contentBlockSchema.parse(await request.json());
    const block = await upsertContentBlock(payload);
    return NextResponse.json({ success: true, block });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to save content." }, { status: 400 });
  }
}
