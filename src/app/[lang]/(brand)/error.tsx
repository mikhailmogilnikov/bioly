"use client";

export default function GlobalErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="font-bold text-2xl">Error</h1>
        <p className="text-gray-500 text-sm">{error.message}</p>
      </div>
    </div>
  );
}
