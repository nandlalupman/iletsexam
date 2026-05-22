"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  blockType: "faq",
  title: "",
  body: "",
  metadataText: "{}",
  status: "draft",
  sortOrder: 0,
};

export default function AdminContentManager({ initialBlocks }) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function startEdit(block) {
    setEditingId(block.id);
    setForm({
      blockType: block.blockType,
      title: block.title,
      body: block.body,
      metadataText: JSON.stringify(block.metadata || {}, null, 2),
      status: block.status,
      sortOrder: block.sortOrder,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    let metadata = {};
    try {
      metadata = form.metadataText ? JSON.parse(form.metadataText) : {};
    } catch {
      setMessage("Metadata must be valid JSON.");
      setIsSaving(false);
      return;
    }

    const endpoint = editingId ? `/api/admin/content/${editingId}` : "/api/admin/content";
    const method = editingId ? "PATCH" : "POST";
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blockType: form.blockType,
        title: form.title,
        body: form.body,
        metadata,
        status: form.status,
        sortOrder: form.sortOrder,
      }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to save content.");
      setIsSaving(false);
      return;
    }

    setBlocks((current) =>
      editingId ? current.map((block) => (block.id === editingId ? payload.block : block)) : [payload.block, ...current],
    );
    setMessage(editingId ? "Content updated." : "Content created.");
    setIsSaving(false);
    resetForm();
  }

  async function handleDelete(id) {
    setMessage("");
    const response = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to delete content.");
      return;
    }

    setBlocks((current) => current.filter((block) => block.id !== id));
    setMessage("Content deleted.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="surface-card rounded-[32px] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="muted-label">Content blocks</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Editable content</h2>
          </div>
          {message ? <p className="text-sm text-[#f5d87d]">{message}</p> : null}
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          {blocks.length ? (
            blocks.map((block) => (
              <div key={block.id} className="grid gap-4 border-b border-white/10 bg-white/5 px-5 py-4 lg:grid-cols-[1.2fr_0.6fr_0.6fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-white">{block.title}</p>
                  <p className="mt-1 text-sm text-[#8ea1c1]">{block.body || "No body content"}</p>
                </div>
                <p className="text-sm text-[#d7dff0]">{block.blockType}</p>
                <p className="text-sm text-[#f5c842]">{block.status}</p>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary px-3 py-2" onClick={() => startEdit(block)}>
                    <Pencil className="h-4 w-4" strokeWidth={2.1} />
                  </button>
                  <button type="button" className="btn-secondary px-3 py-2" onClick={() => handleDelete(block.id)}>
                    <Trash2 className="h-4 w-4" strokeWidth={2.1} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-8 text-sm text-[#8ea1c1]">No content blocks exist yet.</div>
          )}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="surface-card rounded-[32px] p-6">
        <p className="muted-label">{editingId ? "Edit content" : "Create content"}</p>
        <h2 className="mt-2 text-2xl font-bold text-white">{editingId ? "Update block" : "New block"}</h2>
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <select className="input-shell" value={form.blockType} onChange={(event) => updateField("blockType", event.target.value)}>
              <option value="faq">FAQ</option>
              <option value="testimonial">Testimonial</option>
              <option value="pricing">Pricing</option>
              <option value="blog">Blog</option>
              <option value="result">Result</option>
              <option value="general">General</option>
            </select>
            <select className="input-shell" value={form.status} onChange={(event) => updateField("status", event.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <input className="input-shell" placeholder="Title" value={form.title} onChange={(event) => updateField("title", event.target.value)} />
          <textarea className="input-shell min-h-[150px] resize-y" placeholder="Body" value={form.body} onChange={(event) => updateField("body", event.target.value)} />
          <textarea className="input-shell min-h-[120px] resize-y font-mono text-xs" placeholder="Metadata JSON" value={form.metadataText} onChange={(event) => updateField("metadataText", event.target.value)} />
          <input className="input-shell" type="number" value={form.sortOrder} onChange={(event) => updateField("sortOrder", event.target.value)} />
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary flex-1 gap-2" disabled={isSaving}>
            <Plus className="h-4 w-4" strokeWidth={2.1} />
            {isSaving ? "Saving..." : editingId ? "Save content" : "Create content"}
          </button>
          <button type="button" className="btn-secondary" onClick={resetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
}
