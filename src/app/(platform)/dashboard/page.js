import Link from "next/link";
import PlatformFrame from "@/components/platform/PlatformFrame";
import { requireStudentAccess } from "@/lib/access-control";
import { getDashboardSnapshot } from "@/lib/platform-data";

export default async function DashboardPage() {
  await requireStudentAccess();
  const dashboard = await getDashboardSnapshot();

  return (
    <PlatformFrame
      title="Student Dashboard"
      eyebrow="Performance center"
      description="A premium command view for current band score, streak rhythm, and your latest timed Reading sessions."
      action={{ href: "/tests", label: "Start Reading Test" }}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.overview.map((item) => (
          <div key={item.label} className="metric-card">
            <p className="muted-label">{item.label}</p>
            <h2 className="mt-4 text-4xl font-extrabold text-white">{item.value}</h2>
            <p className="mt-3 text-sm text-[#8ea1c1]">{item.helper}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-card rounded-[32px] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="muted-label">Skill breakdown</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Current module strength</h3>
            </div>
            <Link href="/progress" className="text-sm text-[#f5c842]">
              Open progress
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {dashboard.skills.map((skill) => (
              <div key={skill.name} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{skill.name}</span>
                  <span className="text-sm text-[#f5c842]">{skill.delta}</span>
                </div>
                <p className="mt-4 text-3xl font-bold text-white">{skill.score.toFixed(1)}</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-[#f5c842]" style={{ width: `${(skill.score / 9) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[32px] p-6">
          <p className="muted-label">Streak tracker</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Daily focus</h3>
          <div className="mt-6 grid grid-cols-7 gap-3">
            {dashboard.streak.map((day) => (
              <div key={day.day} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs text-[#7a8aaa]">{day.day}</p>
                <div className={`mx-auto mt-3 h-10 w-10 rounded-full ${day.active ? "bg-[#f5c842]" : "bg-white/10"}`} />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-[rgba(45,212,191,0.2)] bg-[rgba(45,212,191,0.08)] p-4 text-sm text-[#b8f2e7]">
            You are 2 sessions away from your best streak. One Reading block today keeps the chain moving.
          </div>
        </section>
      </div>

      <section className="surface-card rounded-[32px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="muted-label">Recent tests</p>
            <h3 className="mt-2 text-2xl font-bold text-white">Latest attempts</h3>
          </div>
          <Link href="/tests" className="btn-secondary">
            Browse tests
          </Link>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-white/10">
          {dashboard.recentTests.map((test) => (
            <div key={`${test.name}-${test.date}`} className="grid gap-3 border-b border-white/10 bg-white/5 px-5 py-4 md:grid-cols-4 md:items-center">
              <p className="font-semibold text-white">{test.name}</p>
              <p className="text-sm text-[#8ea1c1]">{test.date}</p>
              <p className="text-sm text-[#d5def1]">{test.score}</p>
              <p className="text-sm font-semibold text-[#f5c842]">Band {test.band}</p>
            </div>
          ))}
        </div>
      </section>
    </PlatformFrame>
  );
}
