import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { updateSeoPage } from "@/lib/platform-data";
import { seoPageSchema } from "@/lib/validators";

export async function PATCH(request, { params }) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const json = await request.json();
    const payload = seoPageSchema.parse({
      ...json,
      keywords: Array.isArray(json.keywords)
        ? json.keywords
        : `${json.keywords || ""}`
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    });
    const page = await updateSeoPage(params.id, payload);
    return NextResponse.json({ success: true, page });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to update SEO page." }, { status: 400 });
  }
}
