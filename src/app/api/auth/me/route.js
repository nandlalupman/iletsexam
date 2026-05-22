import { NextResponse } from "next/server";
import { getCurrentAccess } from "@/lib/access-control";

export async function GET() {
  const access = await getCurrentAccess();

  if (!access) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: access.id,
      email: access.email,
      fullName: access.fullName,
      phone: access.phone,
      role: access.role,
    },
  });
}
