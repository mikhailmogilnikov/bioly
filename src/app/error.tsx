"use client";

export default function RootErrorBoundary({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
