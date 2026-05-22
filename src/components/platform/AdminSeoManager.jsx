"use client";

import { useState } from "react";

function scoreTone(score) {
  if (score >= 85) {
    return "text-[#86efac] bg-[rgba(16,185,129,0.16)]";
  }

  if (score >= 70) {
    return "text-[#f5d87d] bg-[rgba(245,200,66,0.16)]";
  }

  return "text-[#fda4af] bg-[rgba(244,63,94,0.14)]";
}

export default function AdminSeoManager({ initialPages }) {
  const [pages, setPages] = useState(initialPages);
  const [editingId, setEditingId] = useState(initialPages[0]?.id || null);
  const [message, setMessage] = useState("");

  const activePage = pages.find((page) => page.id === editingId) || pages[0];
  const [form, setForm] = useState(() => ({
    title: activePage?.title || "",
    description: activePage?.description || "",
    slug: activePage?.slug || "",
    keywords: activePage?.keywords?.join(", ") || "",
  }));

  function selectPage(page) {
    setEditingId(page.id);
    setForm({
      title: page.title,
      description: page.description,
      slug: page.slug,
      keywords: page.keywords.join(", "),
    });
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    const response = await fetch(`/api/admin/seo/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to update SEO page.");
      return;
    }

    setPages((current) =>
      current.map((page) =>
        page.id === editingId
          ? {
              ...page,
              ...payload.page,
              keywords: payload.page.keywords || form.keywords.split(",").map((item) => item.trim()).filter(Boolean),
            }
          : page,
      ),
    );
    setMessage("SEO page updated.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="surface-card rounded-[32px] p-6">
        <p className="muted-label">Page health</p>
        <h2 className="mt-2 text-2xl font-bold text-white">SEO manager</h2>
        <div className="mt-6 space-y-4">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => selectPage(page)}
              className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                page.id === editingId
                  ? "border-[rgba(245,200,66,0.18)] bg-[rgba(245,200,66,0.08)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{page.title}</p>
                  <p className="mt-2 text-sm text-[#90a2c0]">{page.slug}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreTone(page.seoScore || 0)}`}>
                  {Math.round(page.seoScore || 0)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="surface-card rounded-[32px] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="muted-label">Metadata editor</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Edit active page</h2>
          </div>
          {message ? <p className="text-sm text-[#f5d87d]">{message}</p> : null}
        </div>

        <div className="mt-6 space-y-4">
          <input className="input-shell" placeholder="Meta title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          <textarea className="input-shell min-h-[140px] resize-y" placeholder="Meta description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          <input className="input-shell" placeholder="Slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} />
          <textarea className="input-shell min-h-[120px] resize-y" placeholder="Keywords, comma separated" value={form.keywords} onChange={(event) => setForm((current) => ({ ...current, keywords: event.target.value }))} />
        </div>

        <button type="submit" className="btn-primary mt-6">
          Save SEO changes
        </button>
      </form>
    </div>
  );
}
