"use client";

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      className="payment-page-payment-link-copy-button"
      type="button"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      Copy Link
    </button>
  );
}
