"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BarChart3,
  BookCopy,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

const groups = [
  {
    label: "Students",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/leads", label: "Demo Leads", icon: MessageSquareText },
      { href: "/admin/users", label: "Students", icon: Users },
      { href: "/admin/results", label: "Results", icon: BarChart3 },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/tests", label: "Mock Tests", icon: BookCopy },
      { href: "/admin/questions", label: "Questions", icon: FileText },
      { href: "/admin/content", label: "Content", icon: Sparkles },
    ],
  },
  {
    label: "SEO & Site",
    items: [
      { href: "/admin/seo", label: "SEO Manager", icon: Search },
      { href: "/admin/settings", label: "Site Settings", icon: Settings2 },
    ],
  },
];

const titleMap = {
  "/admin": {
    eyebrow: "Operations Command",
    title: "Super Admin Dashboard",
    description: "Students, leads, tests, SEO health, and revenue signals in one premium control room.",
  },
  "/admin/leads": {
    eyebrow: "Lead Pipeline",
    title: "Demo Leads",
    description: "Track every demo request from first touch to enrollment or drop-off.",
  },
  "/admin/users": {
    eyebrow: "Student Records",
    title: "Students",
    description: "Profiles, progress, and test history from a single student operations view.",
  },
  "/admin/tests": {
    eyebrow: "Assessment Library",
    title: "Mock Tests",
    description: "Control live and draft IELTS tests, attempts, and content quality.",
  },
  "/admin/questions": {
    eyebrow: "Question Bank",
    title: "Questions",
    description: "Manage MCQ, fill-in-the-blank, essay, and speaking prompt inventory.",
  },
  "/admin/results": {
    eyebrow: "Evaluation Feed",
    title: "Results",
    description: "Review band distribution, flagged attempts, and scoring outcomes.",
  },
  "/admin/seo": {
    eyebrow: "Search Control",
    title: "SEO Manager",
    description: "Monitor page-by-page search readiness, metadata, and publishing quality.",
  },
  "/admin/content": {
    eyebrow: "Publishing Layer",
    title: "Content",
    description: "Update testimonials, FAQs, pricing, and marketing content blocks.",
  },
  "/admin/settings": {
    eyebrow: "Site Control",
    title: "Site Settings",
    description: "Manage public contact details, booking availability, pricing display, and operational defaults.",
  },
};

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const heading = useMemo(() => titleMap[pathname] || titleMap["/admin"], [pathname]);

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      router.push("/login");
      return;
    }

    setIsSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="platform-shell min-h-screen">
      <div className="container-premium py-6 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-[32px] border border-[rgba(245,200,66,0.12)] bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(7,15,29,0.98))] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)] xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto">
            <div className="flex items-center justify-between rounded-[24px] border border-white/8 bg-white/5 px-4 py-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#7d8eaf]">IELTS.my</p>
                <h2 className="mt-1 text-lg font-bold text-white">Admin Console</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(245,200,66,0.14)]">
                <ShieldCheck className="h-5 w-5 text-[#f5c842]" strokeWidth={2.2} />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#6e7ea0]">{group.label}</p>
                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const active = pathname === item.href;
                      return item.disabled ? (
                        <div
                          key={item.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-[#64748b] border border-white/5 bg-white/[0.02]"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" strokeWidth={2.1} />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.2em]">Soon</span>
                        </div>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                            active
                              ? "bg-[rgba(245,200,66,0.14)] text-[#f5c842] border border-[rgba(245,200,66,0.18)]"
                              : "text-[#c6d2e8] border border-transparent hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" strokeWidth={2.1} />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.2em]">{active ? "Live" : "Open"}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-[rgba(245,200,66,0.12)] bg-[rgba(245,200,66,0.06)] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(245,200,66,0.14)] text-lg font-bold text-[#f5c842]">
                  SA
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Super Admin</p>
                  <p className="text-xs text-[#8fa0bf]">Authenticated admin</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#d6dfef]">
                <BriefcaseBusiness className="h-4 w-4 text-[#f5c842]" strokeWidth={2.1} />
                Full control over students, content, SEO, and site operations.
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="btn-secondary mt-6 w-full justify-center gap-2"
            >
              <LogOut className="h-4 w-4" strokeWidth={2.1} />
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(12,25,48,0.96),rgba(8,18,34,0.98))] px-6 py-6 shadow-[0_28px_64px_rgba(0,0,0,0.35)] lg:px-8">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.32em] text-[#7a8aaa]">{heading.eyebrow}</p>
                  <h1 className="mt-3 text-4xl font-extrabold text-white">{heading.title}</h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#92a3c1]">{heading.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,200,66,0.12)] bg-[rgba(245,200,66,0.08)] px-4 py-2 text-sm text-[#f5d87d]">
                    <Sparkles className="h-4 w-4" strokeWidth={2.1} />
                    Admin is independent from the website shell
                  </div>
                </div>
              </div>
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
