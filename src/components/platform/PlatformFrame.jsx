"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

const studentLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tests", label: "Mock Tests" },
  { href: "/progress", label: "Progress" },
  { href: "/speaking", label: "Speaking" },
  { href: "/writing", label: "Writing" },
];

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/tests", label: "Tests" },
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/results", label: "Results" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/content", label: "Content" },
];

export default function PlatformFrame({
  title,
  eyebrow,
  description,
  children,
  role = "student",
  action,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const links = role === "admin" ? adminLinks : studentLinks;

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
    <div className="platform-shell">
      <div className="container-premium py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="surface-card rounded-[32px] p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <div className="mb-8">
              <Link href="/" className="gold-chip mb-4">
                IELTS.my
              </Link>
              <h2 className="text-2xl font-bold text-white">
                {role === "admin" ? "Admin Control" : "Student Console"}
              </h2>
              <p className="mt-2 text-sm text-[#7a8aaa]">
                {role === "admin"
                  ? "Leads, content, tests, and SEO in one operating layer."
                  : "Track your band score, stay in rhythm, and move test by test."}
              </p>
            </div>

            <nav className="space-y-2">
              {links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-[rgba(245,200,66,0.14)] text-[#f5c842]"
                        : "text-[#c8d3ea] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs">{active ? "Live" : "Open"}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="btn-secondary mt-6 w-full"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </aside>

          <main className="space-y-6">
            <div className="surface-card rounded-[32px] p-6 lg:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="muted-label">{eyebrow}</p>
                  <h1 className="mt-3 text-4xl font-extrabold text-white">{title}</h1>
                  {description ? (
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8fa0bf]">{description}</p>
                  ) : null}
                </div>
                {action ? (
                  <div className="flex flex-wrap gap-3">
                    <Link href={action.href} className={action.variant === "secondary" ? "btn-secondary" : "btn-primary"}>
                      {action.label}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
