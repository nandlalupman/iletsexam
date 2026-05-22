import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import MockTestRunner from "@/components/platform/MockTestRunner";
import { getTestBySlug } from "@/lib/platform-data";

export default async function TestDetailPage({ params }) {
  const test = await getTestBySlug(params.slug);

  if (!test) {
    notFound();
  }

  return (
    <div className="platform-shell min-h-screen">
      <div className="container-premium py-6 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[rgba(10,22,40,0.88)] px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Exit test"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
            </Link>
            <div>
              <p className="muted-label">Guest test mode</p>
              <h1 className="mt-1 text-xl font-bold text-white">{test.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[rgba(245,200,66,0.18)] bg-[rgba(245,200,66,0.08)] px-4 py-2 text-sm text-[#f6df98]">
            <ShieldCheck className="h-4 w-4 text-[#f5c842]" strokeWidth={2.2} />
            Submit first, then sign up to unlock your result.
          </div>
        </div>

        <MockTestRunner test={test} />
      </div>
    </div>
  );
}
