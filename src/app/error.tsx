"use client";
import "./error.css";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="error-container">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  );
}
