"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="max-w-screen-sm bg-white mx-auto px-4 py-6">
      <p className="text-center text-neutral-400">Something went wrong.</p>
      <div className="flex justify-center mt-4">
        <button
          onClick={reset}
          className="font-medium text-sm hover:text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
