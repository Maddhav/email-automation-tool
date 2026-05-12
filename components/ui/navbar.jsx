export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 backdrop-blur-xl">
      <div className="container-width h-16 flex items-center justify-between">

        <h1 className="text-2xl font-bold gradient-text">
          AutoReply Pro
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-300">

          <button className="hover:text-white transition">
            Features
          </button>

          <button className="hover:text-white transition">
            Pricing
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-white transition">
            Get Started
          </button>

        </div>

      </div>
    </nav>
  );
}