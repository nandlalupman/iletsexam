import PlatformFrame from "@/components/platform/PlatformFrame";
import ResultPageClient from "@/components/platform/ResultPageClient";
import { requireStudentAccess } from "@/lib/access-control";
import { getAttemptResult } from "@/lib/platform-data";

export default async function ResultPage({ params }) {
  await requireStudentAccess();
  const initialResult = await getAttemptResult(params.attemptId);
  return (
    <PlatformFrame
      title="Result Review"
      eyebrow="Attempt breakdown"
      description="Question-level review, objective score breakdown, and a coach note for the same attempt."
    >
      <ResultPageClient attemptId={params.attemptId} initialResult={initialResult} />
    </PlatformFrame>
  );
}
