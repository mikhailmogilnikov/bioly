"use client";

export default function GlobalErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Error</h1>
        <p className="text-gray-500 text-sm">{error.message}</p>
      </div>
    </div>
  );
}
