import PlatformFrame from "@/components/platform/PlatformFrame";
import { requireStudentAccess } from "@/lib/access-control";

export default async function WritingPage() {
  await requireStudentAccess();
  return (
    <PlatformFrame
      title="Writing Submission"
      eyebrow="Coming next"
      description="The structure is ready for Task 1 and Task 2 submissions, AI evaluation, and manual trainer review."
    >
      <div className="surface-card rounded-[32px] p-6">
        <textarea
          className="input-shell min-h-[320px] resize-y"
          placeholder="Paste a writing response here. The Anthropic evaluation hook can be connected in the next phase."
        />
      </div>
    </PlatformFrame>
  );
}
