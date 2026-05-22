import {
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  CircleDollarSign,
  FileQuestion,
  MailPlus,
  MessageSquareQuote,
  PencilLine,
  SearchCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { getAdminOverview, getSeoPages, getTests } from "@/lib/platform-data";

const quickActions = [
  { label: "Add questions", icon: FileQuestion, href: "/admin/questions" },
  { label: "Add testimonial", icon: MessageSquareQuote, href: "/admin/content" },
  { label: "Publish blog post", icon: PencilLine, href: "/admin/content" },
  { label: "Review leads", icon: MailPlus, href: "/admin/leads" },
];

function statusPill(status) {
  if (status === "new") {
    return "bg-[rgba(59,130,246,0.12)] text-[#93c5fd]";
  }
  if (status === "contacted") {
    return "bg-[rgba(245,200,66,0.12)] text-[#f5d87d]";
  }
  if (status === "enrolled") {
    return "bg-[rgba(34,197,94,0.12)] text-[#86efac]";
  }
  return "bg-[rgba(244,63,94,0.12)] text-[#fda4af]";
}

function seoPill(score) {
  if (score >= 85) {
    return "bg-[rgba(34,197,94,0.14)] text-[#86efac]";
  }
  if (score >= 70) {
    return "bg-[rgba(245,200,66,0.14)] text-[#f5d87d]";
  }
  return "bg-[rgba(244,63,94,0.14)] text-[#fda4af]";
}

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();
  const seoPages = await getSeoPages();
  const tests = await getTests();

  const metrics = [
    { label: "Total Students", value: `${overview?.studentCount || 0}`, helper: "Live student profiles", icon: Users },
    { label: "Demo Leads", value: `${overview?.leadCount || 0}`, helper: "Captured from landing page", icon: MessageSquareQuote },
    { label: "Tests Attempted", value: `${overview?.attemptCount || 0}`, helper: "Reading attempts stored", icon: BookOpenCheck },
    { label: "Revenue", value: "No data", helper: "No payment records table exists", icon: CircleDollarSign },
  ];

  const liveTests = tests.slice(0, 3);
  const liveSeo = seoPages.slice(0, 3);
  const latestLeads = overview?.latestLeads || [];
  const scoreBands = overview?.scoreDistribution || [];

  return (
    <div className="space-y-6">
      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[30px] border border-[rgba(245,200,66,0.12)] bg-[linear-gradient(180deg,rgba(14,27,52,0.96),rgba(9,18,35,0.98))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.32)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#7f90b0]">{metric.label}</p>
              <metric.icon className="h-5 w-5 text-[#f5c842]" strokeWidth={2.1} />
            </div>
            <h2 className="mt-5 text-4xl font-extrabold text-white">{metric.value}</h2>
            <p className="mt-3 text-sm text-[#95a5c3]">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.25fr_0.95fr]">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(8,18,34,0.98))] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#7f90b0]">Demo Leads</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Lead pipeline</h3>
            </div>
            <Link href="/admin/leads" className="btn-secondary px-4 py-2 text-sm">Manage</Link>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/8">
            {latestLeads.length ? (
              latestLeads.map((lead) => (
                <div key={lead.id} className="grid gap-4 border-b border-white/8 bg-white/[0.03] px-5 py-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr] lg:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(245,200,66,0.14)] text-sm font-bold text-[#f5c842]">
                      {lead.full_name?.slice(0, 1) || "L"}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{lead.full_name}</p>
                      <p className="text-sm text-[#90a1bf]">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-[#d7dff0]">Target {lead.target_band}</div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusPill(lead.status || "new")}`}>
                      {lead.status || "new"}
                    </span>
                  </div>
                  <div className="text-sm text-[#8ea1c1]">
                    {new Date(lead.created_at).toLocaleDateString("en-US")}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-sm text-[#8ea1c1]">No leads captured yet.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(8,18,34,0.98))] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] uppercase tracking-[0.28em] text-[#7f90b0]">Score Distribution</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Band performance</h3>
              </div>
              <BarChart3 className="h-5 w-5 text-[#f5c842]" strokeWidth={2.1} />
            </div>
            {scoreBands.some((item) => item.count > 0) ? (
              <div className="space-y-5">
                {scoreBands.map((item) => (
                  <div key={item.band}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#d7dff0]">{item.band}</span>
                      <span className="text-[#f5d87d]">
                        {item.count} attempt{item.count === 1 ? "" : "s"} / {item.percent}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#f5c842] to-[#ffe18b]"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-[#8ea1c1]">
                No test attempts exist yet.
              </div>
            )}
          </div>

          <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(8,18,34,0.98))] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] uppercase tracking-[0.28em] text-[#7f90b0]">Quick Actions</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Publish faster</h3>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#f5c842]" strokeWidth={2.1} />
            </div>
            <div className="grid gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 text-left text-[#dce4f3] transition hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="h-4 w-4 text-[#f5c842]" strokeWidth={2.1} />
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/55" strokeWidth={2.1} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(8,18,34,0.98))] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#7f90b0]">Mock Tests</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Assessment inventory</h3>
            </div>
            <Link href="/admin/tests" className="btn-primary px-4 py-2 text-sm">Create Test</Link>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/8">
            {liveTests.length ? (
              liveTests.map((test) => (
                <div key={test.id} className="grid gap-4 border-b border-white/8 bg-white/[0.03] px-5 py-4 lg:grid-cols-[1.2fr_0.7fr_0.65fr_0.65fr_0.65fr_0.7fr] lg:items-center">
                  <div>
                    <p className="font-semibold text-white">{test.title}</p>
                    <p className="text-sm text-[#8ea1c1]">{test.section}</p>
                  </div>
                  <div className="text-sm text-[#d7dff0]">{test.questionCount} Qs</div>
                  <div className="text-sm text-[#d7dff0]">{test.attemptCount} attempts</div>
                  <div className="text-sm text-[#d7dff0]">Avg {test.averageBand}</div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${test.status === "live" ? "bg-[rgba(34,197,94,0.12)] text-[#86efac]" : "bg-[rgba(245,200,66,0.12)] text-[#f5d87d]"}`}>
                      {test.status}
                    </span>
                  </div>
                  <Link href="/admin/tests" className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/5">Manage</Link>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-sm text-[#8ea1c1]">No mock tests exist yet.</div>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(8,18,34,0.98))] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#7f90b0]">SEO Manager</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Page health</h3>
            </div>
            <SearchCheck className="h-5 w-5 text-[#f5c842]" strokeWidth={2.1} />
          </div>

          <div className="space-y-4">
            {liveSeo.length ? (
              liveSeo.map((row) => (
                <div key={row.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{row.title}</p>
                      <p className="mt-1 text-sm text-[#8ea1c1]">{row.slug}</p>
                    </div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${seoPill(row.seoScore || 0)}`}>
                      SEO {Math.round(row.seoScore || 0)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-2 w-full max-w-[220px] rounded-full bg-white/8">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#f5c842] to-[#ffe18b]" style={{ width: `${row.seoScore || 0}%` }} />
                    </div>
                  <Link href="/admin/seo" className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/5">
                    Edit
                  </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-[#8ea1c1]">
                No SEO pages exist yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
