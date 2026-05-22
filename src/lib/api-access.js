import { NextResponse } from "next/server";
import { getCurrentAccess } from "@/lib/access-control";

export async function requireAdminApiAccess() {
  const access = await getCurrentAccess();

  if (!access) {
    return {
      ok: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  if (access.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true, access };
}
