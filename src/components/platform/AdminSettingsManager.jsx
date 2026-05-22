"use client";

import { useState } from "react";
import { Save, ToggleLeft, ToggleRight } from "lucide-react";

const defaultSettings = {
  siteName: "IELTS.my",
  contactEmail: "",
  supportPhone: "",
  whatsappNumber: "",
  currency: "EUR",
  coursePrice: "",
  guaranteeText: "",
  bookingEnabled: true,
};

export default function AdminSettingsManager({ initialSettings }) {
  const [settings, setSettings] = useState(initialSettings || defaultSettings);
  const [message, setMessage] = useState(initialSettings ? "" : "No settings row exists yet. Saving this form will create it.");
  const [isSaving, setIsSaving] = useState(false);

  function updateField(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to save settings.");
      setIsSaving(false);
      return;
    }

    setSettings(payload.settings);
    setMessage("Settings saved.");
    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
      <section className="surface-card rounded-[32px] p-6">
        <div className="mb-6">
          <p className="muted-label">Public site defaults</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Operational settings</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-[#c9d5eb]">Site name</span>
            <input className="input-shell" value={settings.siteName} onChange={(event) => updateField("siteName", event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#c9d5eb]">Contact email</span>
            <input className="input-shell" value={settings.contactEmail} onChange={(event) => updateField("contactEmail", event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#c9d5eb]">Support phone</span>
            <input className="input-shell" value={settings.supportPhone} onChange={(event) => updateField("supportPhone", event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#c9d5eb]">WhatsApp number</span>
            <input className="input-shell" value={settings.whatsappNumber} onChange={(event) => updateField("whatsappNumber", event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#c9d5eb]">Currency</span>
            <input className="input-shell" value={settings.currency} onChange={(event) => updateField("currency", event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#c9d5eb]">Course price</span>
            <input className="input-shell" value={settings.coursePrice} onChange={(event) => updateField("coursePrice", event.target.value)} />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-[#c9d5eb]">Guarantee text</span>
            <textarea
              className="input-shell min-h-[140px] resize-y"
              value={settings.guaranteeText}
              onChange={(event) => updateField("guaranteeText", event.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="btn-primary mt-6 gap-2" disabled={isSaving}>
          <Save className="h-4 w-4" strokeWidth={2.2} />
          {isSaving ? "Saving..." : "Save settings"}
        </button>
      </section>

      <aside className="surface-card rounded-[32px] p-6">
        <p className="muted-label">Booking control</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Lead intake</h2>
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-left"
          onClick={() => updateField("bookingEnabled", !settings.bookingEnabled)}
        >
          <span>
            <span className="block text-sm font-semibold text-white">Demo booking form</span>
            <span className="mt-1 block text-sm text-[#8ea1c1]">{settings.bookingEnabled ? "Enabled" : "Disabled"}</span>
          </span>
          {settings.bookingEnabled ? (
            <ToggleRight className="h-7 w-7 text-[#f5c842]" strokeWidth={2.1} />
          ) : (
            <ToggleLeft className="h-7 w-7 text-[#7a8aaa]" strokeWidth={2.1} />
          )}
        </button>

        {message ? (
          <div className="mt-6 rounded-[24px] border border-[rgba(245,200,66,0.18)] bg-[rgba(245,200,66,0.08)] p-4 text-sm text-[#f4e2a6]">
            {message}
          </div>
        ) : null}
      </aside>
    </form>
  );
}
