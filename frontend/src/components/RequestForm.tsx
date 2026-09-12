import { useState } from "react";

interface RequestFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
  initialText?: string;
}

export default function RequestForm({ onSubmit, loading, initialText = "" }: Readonly<RequestFormProps>) {
  const [text, setText] = useState(initialText);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length < 5) return;
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the client request here..."
        rows={6}
        style={{ width: "100%", fontFamily: "inherit", fontSize: "1rem", padding: "0.75rem" }}
      />
      <button type="submit" disabled={loading || text.trim().length < 5}>
        {loading ? "Analyzing..." : "Analyze request"}
      </button>
    </form>
  );
}