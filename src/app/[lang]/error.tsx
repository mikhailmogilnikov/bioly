"use client";

export default function GlobalErrorBoundary({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
