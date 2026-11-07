"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050508] text-white flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}

