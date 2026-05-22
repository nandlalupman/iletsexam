"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  testId: "",
  type: "mcq",
  prompt: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  explanation: "",
  sortOrder: 0,
};

export default function AdminQuestionsManager({ initialQuestions, tests }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm, testId: tests[0]?.id || "" });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateOption(index, value) {
    setForm((current) => ({
      ...current,
      options: current.options.map((option, optionIndex) => (optionIndex === index ? value : option)),
    }));
  }

  function startEdit(question) {
    setEditingId(question.id);
    setForm({
      testId: question.testId,
      type: question.type,
      prompt: question.prompt,
      options: [...(question.options || []), "", "", "", ""].slice(0, 4),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      sortOrder: question.sortOrder,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyForm, testId: tests[0]?.id || "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const endpoint = editingId ? `/api/admin/questions/${editingId}` : "/api/admin/questions";
    const method = editingId ? "PATCH" : "POST";
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        options: form.options.filter(Boolean),
      }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to save question.");
      setIsSaving(false);
      return;
    }

    const test = tests.find((item) => item.id === payload.question.testId);
    const saved = {
      ...payload.question,
      testTitle: test?.title || "Unknown test",
      testSlug: test?.slug || "",
      testSection: test?.section || "",
    };

    setQuestions((current) =>
      editingId ? current.map((question) => (question.id === editingId ? saved : question)) : [saved, ...current],
    );
    setMessage(editingId ? "Question updated." : "Question created.");
    setIsSaving(false);
    resetForm();
  }

  async function handleDelete(id) {
    setMessage("");
    const response = await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to delete question.");
      return;
    }

    setQuestions((current) => current.filter((question) => question.id !== id));
    setMessage("Question deleted.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="surface-card rounded-[32px] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="muted-label">Question bank</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Questions</h2>
          </div>
          {message ? <p className="text-sm text-[#f5d87d]">{message}</p> : null}
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          {questions.length ? (
            questions.map((question) => (
              <div key={question.id} className="grid gap-4 border-b border-white/10 bg-white/5 px-5 py-4 lg:grid-cols-[1.2fr_0.7fr_0.6fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-white">{question.prompt}</p>
                  <p className="mt-1 text-sm text-[#8ea1c1]">{question.testTitle}</p>
                </div>
                <p className="text-sm text-[#d7dff0]">{question.type}</p>
                <p className="text-sm text-[#f5c842]">Order {question.sortOrder}</p>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary px-3 py-2" onClick={() => startEdit(question)}>
                    <Pencil className="h-4 w-4" strokeWidth={2.1} />
                  </button>
                  <button type="button" className="btn-secondary px-3 py-2" onClick={() => handleDelete(question.id)}>
                    <Trash2 className="h-4 w-4" strokeWidth={2.1} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-8 text-sm text-[#8ea1c1]">No questions exist yet.</div>
          )}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="surface-card rounded-[32px] p-6">
        <p className="muted-label">{editingId ? "Edit question" : "Create question"}</p>
        <h2 className="mt-2 text-2xl font-bold text-white">{editingId ? "Update prompt" : "New prompt"}</h2>
        <div className="mt-6 space-y-4">
          <select className="input-shell" value={form.testId} onChange={(event) => updateField("testId", event.target.value)}>
            {tests.length ? tests.map((test) => <option key={test.id} value={test.id}>{test.title}</option>) : <option value="">Create a test first</option>}
          </select>
          <div className="grid gap-4 sm:grid-cols-2">
            <select className="input-shell" value={form.type} onChange={(event) => updateField("type", event.target.value)}>
              <option value="mcq">MCQ</option>
              <option value="tfng">True / False / Not Given</option>
              <option value="fill">Fill in the blank</option>
              <option value="short">Short answer</option>
              <option value="essay">Essay</option>
              <option value="speaking">Speaking</option>
            </select>
            <input className="input-shell" type="number" value={form.sortOrder} onChange={(event) => updateField("sortOrder", event.target.value)} />
          </div>
          <textarea className="input-shell min-h-[130px] resize-y" placeholder="Question prompt" value={form.prompt} onChange={(event) => updateField("prompt", event.target.value)} />
          {(form.type === "mcq" || form.type === "tfng") ? (
            <div className="grid gap-3">
              {form.options.map((option, index) => (
                <input key={index} className="input-shell" placeholder={`Option ${index + 1}`} value={option} onChange={(event) => updateOption(index, event.target.value)} />
              ))}
            </div>
          ) : null}
          <input className="input-shell" placeholder="Correct answer" value={form.correctAnswer} onChange={(event) => updateField("correctAnswer", event.target.value)} />
          <textarea className="input-shell min-h-[110px] resize-y" placeholder="Explanation" value={form.explanation} onChange={(event) => updateField("explanation", event.target.value)} />
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary flex-1 gap-2" disabled={isSaving || !tests.length}>
            <Plus className="h-4 w-4" strokeWidth={2.1} />
            {isSaving ? "Saving..." : editingId ? "Save question" : "Create question"}
          </button>
          <button type="button" className="btn-secondary" onClick={resetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
}
