import PlatformFrame from "@/components/platform/PlatformFrame";
import { requireStudentAccess } from "@/lib/access-control";
import { getDashboardSnapshot } from "@/lib/platform-data";

export default async function ProgressPage() {
  await requireStudentAccess();
  const dashboard = await getDashboardSnapshot();

  return (
    <PlatformFrame
      title="Progress"
      eyebrow="Trend view"
      description="A simple band progression chart for the MVP. This should later be backed by real attempt history from Supabase."
    >
      <div className="surface-card rounded-[32px] p-6">
        <div className="flex items-end gap-4">
          {dashboard.timeline.map((point) => (
            <div key={point.month} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-56 w-full items-end rounded-[24px] bg-white/5 p-3">
                <div
                  className="w-full rounded-[18px] bg-gradient-to-t from-[#f5c842] to-[#ffe085]"
                  style={{ height: `${(point.band / 9) * 100}%` }}
                />
              </div>
              <p className="text-sm text-[#c8d2ea]">{point.month}</p>
              <p className="text-sm font-semibold text-white">{point.band.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </PlatformFrame>
  );
}
