export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: June 2026</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>AutoReply Pro ("we", "our", or "us") operates the autoreplypro.online website and application. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gmail Data:</strong> When you connect your Gmail account via OAuth, we access your email inbox to analyze emails and generate replies. We do not permanently store your emails.</li>
              <li><strong>Account Information:</strong> Name, email address, and account preferences you provide when signing up.</li>
              <li><strong>Usage Data:</strong> Information about how you use AutoReply Pro, including which emails you analyze and replies you generate.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain the Service</li>
              <li>To analyze emails and generate AI-powered replies</li>
              <li>To improve and personalize your experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Gmail Data Security</h2>
            <p>AutoReply Pro only reads emails to analyze them. We:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Never permanently store your email content</li>
              <li>Never share your data with third parties</li>
              <li>Use OAuth tokens that expire automatically</li>
              <li>Allow you to revoke access anytime through your Google account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
            <p>We retain your account information as long as your account is active. Email analysis logs are retained for 30 days, then automatically deleted. You can request deletion anytime.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Third-Party Services</h2>
            <p>We use Google's Gmail API and Groq's AI services. These services have their own privacy policies. We recommend reviewing them.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at: support@autoreplypro.online</p>
          </section>
        </div>
      </div>
    </main>
  );
}