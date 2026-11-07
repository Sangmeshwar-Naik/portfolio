import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6">
        404 — Page Not Found
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
        Cosmic Void
      </h1>
      <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base mb-8">
        The requested coordinates do not exist in this galaxy. Return to base to explore the portfolio.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}

