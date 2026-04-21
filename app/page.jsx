"use client";
import { useState } from "react";

export default function Home() {
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
      Complaint: "bg-red-100 text-red-800",
      Urgent: "bg-orange-100 text-orange-800",
      Inquiry: "bg-blue-100 text-blue-800",
      Spam: "bg-gray-100 text-gray-800",
      General: "bg-green-100 text-green-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📧 Email Automation Tool
        </h1>
        <p className="text-gray-500 mb-8">
          Paste any email and get instant AI analysis and a professional reply
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Email Here
          </label>
          <textarea
            className="w-full h-48 p-4 border border-gray-200 rounded-xl text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste the email you received here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={analyzeEmail}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Email"}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">
                Category:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(result.category)}`}
              >
                {result.category}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Summary
              </h3>
              <p className="text-gray-800">{result.summary}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Suggested Reply
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-800 whitespace-pre-wrap">
                {result.reply}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}