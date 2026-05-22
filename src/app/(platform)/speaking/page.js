import PlatformFrame from "@/components/platform/PlatformFrame";
import { requireStudentAccess } from "@/lib/access-control";

export default async function SpeakingPage() {
  await requireStudentAccess();
  return (
    <PlatformFrame
      title="Speaking Upload"
      eyebrow="Coming next"
      description="The page is designed for prompt-based audio uploads. The UI is in place and the backend slot is ready for Supabase Storage and AI evaluation."
    >
      <div className="surface-card rounded-[32px] p-6">
        <div className="rounded-[28px] border border-dashed border-[rgba(245,200,66,0.28)] bg-[rgba(245,200,66,0.05)] p-10 text-center">
          <h2 className="text-3xl font-bold text-white">Speaking prompt upload</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8ea1c1]">
            Connect Supabase Storage and the Anthropic evaluation worker to accept audio submissions, store files, and return band-based speaking feedback.
          </p>
        </div>
      </div>
    </PlatformFrame>
  );
}
