import { NextResponse } from "next/server";
import { createDemoBooking, getDemoBookings } from "@/lib/platform-data";
import { demoBookingSchema } from "@/lib/validators";

export async function GET() {
  const leads = await getDemoBookings();
  return NextResponse.json({ leads });
}

export async function POST(request) {
  try {
    const json = await request.json();
    const payload = demoBookingSchema.parse(json);
    const booking = await createDemoBooking(payload);

    return NextResponse.json({
      success: true,
      booking,
      message: "Your demo request is in. IELTS.my will contact you shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to submit your request.",
      },
      { status: 400 },
    );
  }
}
