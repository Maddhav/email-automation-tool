"use client";

import { useState } from "react";
import Navbar from "../../components/ui/navbar";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Complaint: "bg-red-500/20 text-red-300 border-red-500/30",
      Urgent: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      Inquiry: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Spam: "bg-gray-500/20 text-gray-300 border-gray-500/30",
      General: "bg-green-500/20 text-green-300 border-green-500/30",
    };
    return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <main className="min-h-screen bg-background text-foreground dark">

      <Navbar />

      <div className="container-width py-12">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Email <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-400">
            Paste any email and get instant AI analysis and a professional reply
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Input Section */}
          <div className="glass-card rounded-2xl p-6">
            <label className="block text-sm text-gray-400 mb-3">
              Paste Email Here
            </label>
            <textarea
              className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste the email you received here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={analyzeEmail}
              disabled={loading}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "⚡ Analyze Email"}
            </button>
          </div>

          {/* Results Section */}
          <div className="glass-card rounded-2xl p-6">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <div className="text-5xl mb-4">📧</div>
                <p>Paste an email and click Analyze to see AI results here</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <div className="text-5xl mb-4 animate-pulse">🤖</div>
                <p>AI is analyzing your email...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Category:</span>
                  <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(result.category)}`}>
                    {result.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Summary</h3>
                  <p className="text-white/90 leading-relaxed">{result.summary}</p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Suggested Reply</h3>
                  <div className="bg-white/5 rounded-xl p-4 whitespace-pre-wrap text-white/90 text-sm leading-relaxed">
                    {result.reply}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(result.reply)}
                    className="mt-3 w-full border border-white/10 hover:border-purple-500/50 text-gray-300 hover:text-white py-2 rounded-xl transition text-sm"
                  >
                    📋 Copy Reply
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </main>
  );
}