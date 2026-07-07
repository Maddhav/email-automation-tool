"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ... CATEGORY_STYLES stays the same ...

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [emails, setEmails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [analyses, setAnalyses] = useState({});
  const [analyzing, setAnalyzing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize fetchEmails
  const fetchEmails = useCallback(async () => {
    try {
      setEmailLoading(true);
      const res = await fetch("/api/gmail/inbox");
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setEmails([]);
      } else {
        setEmails(data.emails || []);
      }
    } catch (err) {
      setError("Failed to fetch emails");
      console.error(err);
    } finally {
      setEmailLoading(false);
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("user_id");

    if (!storedUsername || !storedUserId) {
      router.push("/auth/login");
      return;
    }

    setUsername(storedUsername);
    setLoading(false);
    fetchEmails();
  }, [router, fetchEmails]);

  async function fetchEmails() {
    try {
      setEmailLoading(true);
      const res = await fetch("/api/gmail/inbox");
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setEmails([]);
      } else {
        setEmails(data.emails || []);
      }
    } catch (err) {
      setError("Failed to fetch emails");
      console.error(err);
    } finally {
      setEmailLoading(false);
    }
  }

  async function analyzeEmail(email) {
    if (analyses[email.id]) {
      setSelected(email);
      return;
    }
    
    setSelected(email);
    setAnalyzing(email.id);
    
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: `Subject: ${email.subject}\n\n${email.snippet || email.body}` 
        }),
      });
      
      const data = await res.json();
      setAnalyses(prev => ({ ...prev, [email.id]: data }));
    } catch (err) {
      console.error("Analysis error:", err);
    }
    
    setAnalyzing(null);
  }

  function handleLogout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    localStorage.removeItem("username");
    router.push("/auth/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const stats = {
    total: emails.length,
    analyzed: Object.keys(analyses).length,
  };

  const currentAnalysis = selected ? analyses[selected.id] : null;
  const isAnalyzing = selected && analyzing === selected.id;

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .glass { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); }
        .scroll-thin::-webkit-scrollbar { width: 4px; }
        .scroll-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-bold">A</div>
          <span className="font-semibold">AutoReply Pro</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Welcome, {username}</span>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-52 border-r border-gray-800 p-4 flex flex-col">
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase mb-3">Stats</p>
            <div className="space-y-2">
              <div className="glass rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{stats.total}</div>
                <div className="text-xs text-gray-400">Emails</div>
              </div>
              <div className="glass rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{stats.analyzed}</div>
                <div className="text-xs text-gray-400">Analyzed</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Email list */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="text-sm font-semibold">Inbox ({emails.length})</h2>
          </div>

          <div className="flex-1 overflow-y-auto scroll-thin">
            {emailLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Loading emails...
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-center px-4">
                <div>
                  <p className="text-red-400 text-sm mb-2">{error}</p>
                  <p className="text-gray-500 text-xs">Try reconnecting Gmail from connect page</p>
                </div>
              </div>
            ) : emails.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm text-center px-4">
                <p>No unread emails found</p>
              </div>
            ) : (
              emails.map(email => {
                const a = analyses[email.id];
                return (
                  <button
                    key={email.id}
                    onClick={() => analyzeEmail(email)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-gray-800/50 transition ${selected?.id === email.id ? "bg-purple-900/20" : ""}`}
                  >
                    <p className="text-xs font-medium text-white truncate">{email.from}</p>
                    <p className="text-xs text-gray-400 truncate mt-1">{email.subject}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{email.snippet}</p>
                    {a && (
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${CATEGORY_STYLES[a.category]?.badge || "bg-gray-700"}`}>
                          {a.category}
                        </span>
                      </div>
                    )}
                    {analyzing === email.id && <p className="text-xs text-purple-400 mt-1">Analyzing...</p>}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail pane */}
        <main className="flex-1 flex flex-col overflow-hidden p-6">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-4xl mb-4">📬</p>
              <p className="text-sm">Select an email to analyze</p>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto">
              {/* Email Header */}
              <div className="glass rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-2">{selected.subject}</h2>
                <p className="text-sm text-gray-400">{selected.from}</p>
                <p className="text-xs text-gray-500 mt-2">{selected.date}</p>
                <p className="text-sm text-gray-300 mt-4 leading-relaxed">{selected.snippet}</p>
              </div>

              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent mb-3" />
                    <p className="text-sm text-gray-400">AI is analyzing...</p>
                  </div>
                </div>
              ) : currentAnalysis ? (
                <>
                  {/* Analysis cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Category", value: currentAnalysis.category, style: CATEGORY_STYLES[currentAnalysis.category]?.badge },
                      { label: "Sentiment", value: currentAnalysis.sentiment || "Neutral" },
                      { label: "Priority", value: currentAnalysis.priority || "Medium" },
                    ].map(card => (
                      <div key={card.label} className="glass rounded-lg p-3">
                        <p className="text-xs text-gray-500 uppercase mb-2">{card.label}</p>
                        <span className={`text-xs font-semibold ${card.style || "text-gray-300"}`}>
                          {card.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="glass rounded-xl p-5">
                    <p className="text-xs text-gray-500 uppercase mb-2">Summary</p>
                    <p className="text-sm text-gray-300">{currentAnalysis.summary}</p>
                  </div>

                  {/* Draft reply */}
                  <div className="glass rounded-xl p-5">
                    <p className="text-xs text-gray-500 uppercase mb-3">AI Draft Reply</p>
                    <textarea
                      defaultValue={currentAnalysis.reply || ""}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={8}
                    />
                  </div>
                </>
              ) : (
                <div className="glass rounded-xl p-8 text-center text-gray-400 text-sm">
                  Click email to analyze with AI
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}