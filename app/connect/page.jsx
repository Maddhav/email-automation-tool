import Navbar from "../../components/ui/navbar";
import Link from "next/link";

export default function Connect() {
  return (
    <main className="min-h-screen bg-background text-foreground dark">

      <Navbar />

      <div className="container-width py-12">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Connect <span className="gradient-text">Gmail</span>
          </h1>
          <p className="text-gray-400">
            Link your Gmail account to automate your email workflow
          </p>
        </div>

        <div className="max-w-2xl">

          <div className="glass-card rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">📧</div>
              <div>
                <h2 className="text-white font-semibold text-xl">Gmail Integration</h2>
                <p className="text-gray-400 text-sm">Connect your Gmail to read and reply to emails automatically</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { step: "1", title: "Click Connect Gmail", desc: "You will be redirected to Google to authorize access" },
                { step: "2", title: "Authorize Access", desc: "Allow AutoReply Pro to read and send emails on your behalf" },
                { step: "3", title: "Start Automating", desc: "Your inbox will appear in the dashboard automatically" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-3">
              <span>🔗</span> Connect Gmail Account
            </button>

          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">🔒 Your data is safe</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AutoReply Pro only reads emails to generate AI replies. We never store your emails permanently or share your data with third parties.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}