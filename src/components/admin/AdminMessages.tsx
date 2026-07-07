"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { CheckCircle, Trash2 } from "lucide-react";

interface Message {
  id: string; name: string; email: string; phone?: string;
  subject: string; message: string; isRead: boolean; createdAt: string;
}

export function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const json = await res.json();
    if (json.success) setMessages(json.data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m));
  };

  const deleteMessage = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-black text-white mb-2">Contact Messages</h1>
        <p className="text-white/50 mb-6">{messages.filter((m) => !m.isRead).length} unread messages</p>
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-160px)]">
          {/* List */}
          <div className="col-span-1 bg-white/[0.03] border border-white/10 rounded-2xl overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-white/40">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-white/40">No messages yet</div>
            ) : (
              messages.map((m) => (
                <div key={m.id} onClick={() => { setSelected(m); if (!m.isRead) markRead(m.id); }}
                  className={`p-4 border-b border-white/[0.06] cursor-pointer hover:bg-white/[0.03] transition-all ${selected?.id === m.id ? "bg-purple-500/10" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {!m.isRead && <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />}
                        <p className={`text-sm font-medium truncate ${m.isRead ? "text-white/70" : "text-white"}`}>{m.name}</p>
                      </div>
                      <p className="text-xs text-white/40 truncate mt-0.5">{m.subject}</p>
                    </div>
                    <p className="text-xs text-white/30 shrink-0">{new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Detail */}
          <div className="col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 overflow-y-auto">
            {!selected ? (
              <div className="h-full flex items-center justify-center text-white/30">Select a message to read</div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-white font-bold text-xl">{selected.subject}</h2>
                    <p className="text-white/60 text-sm mt-1">From: {selected.name} ({selected.email}){selected.phone ? ` · ${selected.phone}` : ""}</p>
                    <p className="text-white/40 text-xs mt-0.5">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    {!selected.isRead && (
                      <button onClick={() => markRead(selected.id)} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all" title="Mark as read">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deleteMessage(selected.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all">
                  Reply via Email
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
