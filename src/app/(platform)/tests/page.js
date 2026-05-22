import Link from "next/link";
import PlatformFrame from "@/components/platform/PlatformFrame";
import { getTests } from "@/lib/platform-data";

export default async function TestsPage() {
  const tests = await getTests();

  return (
    <PlatformFrame
      title="Mock Tests"
      eyebrow="Student zone"
      description="Start with the Reading MVP flow: timed passage, mixed questions, submit action, score popup, and full review."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {tests.map((test) => (
          <div key={test.id} className="surface-card rounded-[32px] p-6">
            <div className="flex items-center justify-between">
              <p className="gold-chip">{test.section}</p>
              <span className="text-sm text-[#8ea1c1]">{test.level}</span>
            </div>
            <h2 className="mt-5 text-3xl font-bold text-white">{test.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#93a5c4]">{test.description}</p>
            <div className="mt-6 flex gap-6 text-sm text-[#d0daef]">
              <span>{test.durationMinutes} min</span>
              <span>{test.questionCount} prompts</span>
            </div>
            <Link href={`/tests/${test.slug}`} className="btn-primary mt-8">
              Open test
            </Link>
          </div>
        ))}
      </div>
    </PlatformFrame>
  );
}
