"use client";

import { useState } from "react";

const statuses = ["new", "contacted", "enrolled", "dropped"];

const statusStyles = {
  new: "bg-[rgba(59,130,246,0.16)] text-[#93c5fd]",
  contacted: "bg-[rgba(245,200,66,0.16)] text-[#f5d87d]",
  enrolled: "bg-[rgba(16,185,129,0.16)] text-[#86efac]",
  dropped: "bg-[rgba(244,63,94,0.14)] text-[#fda4af]",
};

export default function AdminLeadsManager({ initialLeads }) {
  const [leads, setLeads] = useState(initialLeads);
  const [message, setMessage] = useState("");

  async function updateLeadStatus(id, status) {
    setMessage("");
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "Unable to update lead status.");
      return;
    }

    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    setMessage("Lead status updated.");
  }

  return (
    <div className="surface-card rounded-[32px] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="muted-label">Lead inbox</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Demo bookings</h2>
        </div>
        {message ? <p className="text-sm text-[#f5d87d]">{message}</p> : null}
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/10">
        {leads.map((lead) => (
          <div key={lead.id} className="grid gap-4 border-b border-white/10 bg-white/5 px-5 py-4 lg:grid-cols-[1.2fr_1.1fr_0.9fr_0.9fr_1fr] lg:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(245,200,66,0.14)] font-semibold text-[#f5c842]">
                {lead.full_name.slice(0, 1)}
              </div>
              <div>
                <p className="font-semibold text-white">{lead.full_name}</p>
                <p className="text-sm text-[#92a3c1]">{lead.email}</p>
              </div>
            </div>
            <p className="text-sm text-[#cfd8eb]">{lead.phone}</p>
            <p className="text-sm text-[#f5c842]">Target {lead.target_band}</p>
            <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusStyles[lead.status] || statusStyles.new}`}>
              {lead.status || "new"}
            </span>
            <select
              className="input-shell text-sm"
              value={lead.status || "new"}
              onChange={(event) => updateLeadStatus(lead.id, event.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
