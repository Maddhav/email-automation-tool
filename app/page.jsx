import Navbar from "../components/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground dark">

      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient grid-pattern">
        <div className="container-width py-32 text-center">

          <div className="inline-block px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300 mb-8">
            ✨ AI Powered Email Automation
          </div>

          <h1 className="text-6xl font-bold leading-tight text-white mb-6">
            Stop Drowning in <br />
            <span className="gradient-text">Emails. Automate.</span>
          </h1>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            AutoReply Pro reads your emails, understands them, categorizes
            them and drafts professional replies — instantly. Save hours
            every single day.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Try it Free →
              </button>
            </Link>
            <Link href="/connect">
              <button className="border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-2xl transition text-lg">
                Connect Gmail
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container-width">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to handle
              <span className="gradient-text"> email at scale</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Built for small businesses, solopreneurs and teams who
              receive too many emails to handle manually.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                icon: "🤖",
                title: "AI Categorization",
                desc: "Every email is automatically labeled as Complaint, Inquiry, Urgent, Spam or General so you always know what needs attention first."
              },
              {
                icon: "✍️",
                title: "Auto Draft Replies",
                desc: "AutoReply Pro drafts a professional reply for every email instantly. Edit it or send it as is. Your choice."
              },
              {
                icon: "📊",
                title: "Email Dashboard",
                desc: "See all your emails in one clean dashboard. Filter by category, see summaries and manage replies without opening Gmail."
              },
              {
                icon: "🔗",
                title: "Gmail Integration",
                desc: "Connect your Gmail account in one click. AutoReply Pro reads your inbox automatically — no copy pasting needed."
              },
              {
                icon: "🌍",
                title: "Multi Language",
                desc: "AutoReply Pro understands emails in any language and drafts replies in the same language automatically."
              },
              {
                icon: "⚡",
                title: "Instant Results",
                desc: "No waiting. Paste an email or connect Gmail and get AI analysis in under 3 seconds every time."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing hero-gradient">
        <div className="container-width">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How <span className="gradient-text">AutoReply Pro</span> works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect or Paste", desc: "Connect your Gmail account or simply paste any email into AutoReply Pro." },
              { step: "02", title: "AI Analyzes", desc: "Our AI reads the email, understands the intent, categorizes it and writes a professional reply." },
              { step: "03", title: "You Review and Send", desc: "Review the AI drafted reply, make any edits you want and send it. Done in seconds." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-bold gradient-text mb-4">{step.step}</div>
                <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-spacing">
        <div className="container-width">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                desc: "Perfect for trying AutoReply Pro",
                features: ["50 emails per month", "AI categorization", "Auto draft replies", "Email dashboard"],
                cta: "Get Started Free",
                highlighted: false
              },
              {
                name: "Pro",
                price: "$29",
                period: "per month",
                desc: "For growing businesses",
                features: ["Unlimited emails", "Gmail integration", "Priority support", "Multi language", "Advanced analytics"],
                cta: "Start Pro Trial",
                highlighted: true
              },
              {
                name: "Business",
                price: "$79",
                period: "per month",
                desc: "For teams and agencies",
                features: ["Everything in Pro", "5 Gmail accounts", "Team dashboard", "Custom AI training", "Dedicated support"],
                cta: "Contact Us",
                highlighted: false
              }
            ].map((plan, i) => (
              <div key={i} className={`glass-card rounded-2xl p-8 ${plan.highlighted ? "border-purple-500/50 ring-1 ring-purple-500/30" : ""}`}>
                {plan.highlighted && (
                  <div className="text-xs text-purple-300 font-semibold mb-4 uppercase tracking-wider">Most Popular</div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition ${plan.highlighted ? "bg-purple-600 hover:bg-purple-700 text-white" : "border border-white/10 hover:border-white/20 text-white"}`}>
                  {plan.cta}
                </button>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container-width flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-bold gradient-text">AutoReply Pro</h2>
          <p className="text-gray-400 text-sm">© 2026 AutoReply Pro. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link href="/connect" className="hover:text-white transition">Connect Gmail</Link>
            <Link href="/settings" className="hover:text-white transition">Settings</Link>

          <footer className="py-6 text-center text-sm text-gray-500">
  <Link href="/privacy">Privacy Policy</Link>
  {" | "}
  <Link href="/terms">Terms of Service</Link>
</footer>
          </div>
        </div>
      </footer>

    </main>
  );
}