"use client";

import { useState } from "react";
import { Headphones, UploadCloud } from "lucide-react";

const emptyForm = {
  slug: "",
  title: "",
  section: "Reading",
  level: "Academic",
  durationMinutes: 60,
  questionCount: 40,
  description: "",
  audioPath: "",
  audioUrl: "",
  status: "draft",
};

export default function AdminTestsManager({ initialTests }) {
  const [tests, setTests] = useState(initialTests);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function startEdit(test) {
    setEditingId(test.id);
    setForm({
      slug: test.slug,
      title: test.title,
      section: test.section,
      level: test.level,
      durationMinutes: test.durationMinutes,
      questionCount: test.questionCount,
      description: test.description,
      audioPath: test.audioPath || "",
      audioUrl: test.audioUrl || "",
      status: test.status || "draft",
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

    const endpoint = editingId ? `/api/admin/tests/${editingId}` : "/api/admin/tests";
    const method = editingId ? "PATCH" : "POST";
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to save test.");
      setIsSaving(false);
      return;
    }

    setTests((current) => {
      if (editingId) {
        return current.map((test) => (test.id === editingId ? { ...test, ...payload.test } : test));
      }

      return [{ ...payload.test, attemptCount: 0, averageBand: "0.0" }, ...current];
    });

    setMessage(editingId ? "Test updated." : "Test created.");
    setIsSaving(false);
    resetForm();
  }

  async function handleAudioUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage("");

    const body = new FormData();
    body.append("file", file);

    const response = await fetch("/api/admin/uploads/audio", {
      method: "POST",
      body,
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to upload audio.");
      setIsUploading(false);
      return;
    }

    setForm((current) => ({
      ...current,
      audioPath: payload.audioPath,
      audioUrl: payload.audioUrl,
    }));
    setMessage("Audio uploaded. Save the test to attach it.");
    setIsUploading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="surface-card rounded-[32px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="muted-label">Assessment library</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Mock tests</h2>
          </div>
          {message ? <p className="text-sm text-[#f5d87d]">{message}</p> : null}
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          {tests.length ? (
            tests.map((test) => (
              <div key={test.id} className="grid gap-4 border-b border-white/10 bg-white/5 px-5 py-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr_0.8fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-white">{test.title}</p>
                  <p className="mt-1 text-sm text-[#90a2c0]">{test.slug}</p>
                  {test.audioUrl ? (
                    <p className="mt-2 inline-flex items-center gap-2 text-xs text-[#f5d87d]">
                      <Headphones className="h-3.5 w-3.5" strokeWidth={2.1} />
                      Audio attached
                    </p>
                  ) : null}
                </div>
                <p className="text-sm text-[#d6def0]">{test.section}</p>
                <p className="text-sm text-[#d6def0]">{test.questionCount} Qs</p>
                <p className="text-sm text-[#d6def0]">{test.attemptCount || 0} attempts</p>
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${test.status === "live" ? "bg-[rgba(16,185,129,0.16)] text-[#86efac]" : "bg-white/10 text-[#c8d2e6]"}`}>
                  {test.status}
                </span>
                <button type="button" className="btn-secondary" onClick={() => startEdit(test)}>
                  Edit
                </button>
              </div>
            ))
          ) : (
            <div className="px-5 py-8 text-sm text-[#8ea1c1]">No mock tests exist yet.</div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="surface-card rounded-[32px] p-6">
        <p className="muted-label">{editingId ? "Update test" : "Create test"}</p>
        <h2 className="mt-2 text-2xl font-bold text-white">{editingId ? "Edit mock test" : "New mock test"}</h2>
        <div className="mt-6 space-y-4">
          <input className="input-shell" placeholder="Slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} />
          <input className="input-shell" placeholder="Title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input-shell" placeholder="Section" value={form.section} onChange={(event) => setForm((current) => ({ ...current, section: event.target.value }))} />
            <input className="input-shell" placeholder="Level" value={form.level} onChange={(event) => setForm((current) => ({ ...current, level: event.target.value }))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input-shell" type="number" placeholder="Duration" value={form.durationMinutes} onChange={(event) => setForm((current) => ({ ...current, durationMinutes: event.target.value }))} />
            <input className="input-shell" type="number" placeholder="Question count" value={form.questionCount} onChange={(event) => setForm((current) => ({ ...current, questionCount: event.target.value }))} />
          </div>
          <textarea className="input-shell min-h-[140px] resize-y" placeholder="Description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Listening audio</p>
                <p className="mt-1 text-sm text-[#8ea1c1]">{form.audioUrl ? "Audio file attached to this test." : "No audio file attached."}</p>
              </div>
              <label className="btn-secondary cursor-pointer gap-2">
                <UploadCloud className="h-4 w-4" strokeWidth={2.1} />
                {isUploading ? "Uploading..." : "Upload audio"}
                <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} disabled={isUploading} />
              </label>
            </div>
            {form.audioUrl ? (
              <audio className="mt-4 w-full" controls src={form.audioUrl}>
                <track kind="captions" />
              </audio>
            ) : null}
          </div>
          <select className="input-shell" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
            <option value="draft">Draft</option>
            <option value="live">Live</option>
          </select>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary flex-1" disabled={isSaving}>
            {isSaving ? "Saving..." : editingId ? "Save changes" : "Create test"}
          </button>
          <button type="button" className="btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
