import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/api-access";
import { createServiceRoleSupabaseClient } from "@/lib/supabase-server";

const BUCKET = "test-audio";
const AUDIO_TYPES = new Set([
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/webm",
  "audio/mp4",
]);

function cleanFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request) {
  const access = await requireAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, message: "Audio file is required." }, { status: 400 });
    }

    if (!AUDIO_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, message: "Upload an MP3, WAV, OGG, WEBM, or MP4 audio file." }, { status: 400 });
    }

    const supabase = createServiceRoleSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Supabase service role is not configured." }, { status: 500 });
    }

    const { error: bucketError } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      allowedMimeTypes: Array.from(AUDIO_TYPES),
      fileSizeLimit: 52428800,
    });

    if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) {
      throw bucketError;
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const filePath = `tests/${Date.now()}-${cleanFileName(file.name || "audio-file")}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(filePath, bytes, {
      contentType: file.type,
      upsert: true,
    });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      audioPath: filePath,
      audioUrl: data.publicUrl,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Unable to upload audio." }, { status: 400 });
  }
}
