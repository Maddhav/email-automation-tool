"use client";

import { useState } from "react";
import Navbar from "../../components/ui/navbar";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    signature: "",
    autoReply: false,
    language: "English",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground dark">

      <Navbar />

      <div className="container-width py-12">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-gray-400">Customize AutoReply Pro for your business</p>
        </div>

        <div className="max-w-2xl space-y-6">

          {/* Business Profile */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-6">Business Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Business Name</label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Business Email</label>
                <input
                  type="email"
                  placeholder="you@yourbusiness.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Email Signature */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-6">Email Signature</h2>
            <textarea
              placeholder="Best regards,&#10;Your Name&#10;Your Business"
              value={form.signature}
              onChange={(e) => setForm({ ...form, signature: e.target.value })}
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-gray-500 text-xs mt-2">This signature will be added to all AI generated replies</p>
          </div>

          {/* Preferences */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Auto Reply Mode</h3>
                  <p className="text-gray-400 text-sm">Automatically send AI replies without manual review</p>
                </div>
                <button
                  onClick={() => setForm({ ...form, autoReply: !form.autoReply })}
                  className={`w-12 h-6 rounded-full transition-colors ${form.autoReply ? "bg-purple-600" : "bg-white/10"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform mx-0.5 ${form.autoReply ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Reply Language</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition"
          >
            {saved ? "✅ Settings Saved!" : "Save Settings"}
          </button>

        </div>

      </div>

    </main>
  );
}