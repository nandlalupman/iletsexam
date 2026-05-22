import { getAttemptFeed } from "@/lib/platform-data";

export default async function AdminResultsPage() {
  const attempts = await getAttemptFeed();

  return (
    <div className="surface-card rounded-[32px] p-6">
      <h2 className="text-2xl font-bold text-white">Results queue</h2>
      <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
        {attempts.length ? (
          attempts.map((attempt) => (
            <div key={attempt.id} className="grid gap-4 border-b border-white/10 bg-white/5 px-5 py-4 lg:grid-cols-[0.8fr_0.7fr_0.9fr_0.8fr_0.9fr] lg:items-center">
              <p className="text-sm text-white">{attempt.section}</p>
              <p className="text-sm text-[#f5c842]">Band {Number(attempt.band_score || 0).toFixed(1)}</p>
              <p className="text-sm text-[#d7dff0]">
                {attempt.correct_count}/{attempt.total_objective}
              </p>
              <p className="text-sm text-[#d7dff0]">{attempt.user_id ? "Student" : "Guest"}</p>
              <p className="text-sm text-[#8ea1c1]">{new Date(attempt.created_at).toLocaleString("en-US")}</p>
            </div>
          ))
        ) : (
          <div className="px-5 py-8 text-sm text-[#8ea1c1]">No attempts recorded yet.</div>
        )}
      </div>
    </div>
  );
}
