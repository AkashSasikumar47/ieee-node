"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-screen-sm bg-white px-4 py-6">
      <p className="text-center text-neutral-400">Something went wrong.</p>
      <div className="mt-4 flex justify-center">
        <button
          onClick={reset}
          className="text-sm font-medium hover:text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
