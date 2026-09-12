import { useState } from "react";
import SampleRequests from "./SampleRequests";

interface RequestFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export default function RequestForm({ onSubmit, loading }: Readonly<RequestFormProps>) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length < 5) return;
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="request-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the client request here..."
        rows={5}
      />
      <div className="form-row">
        <SampleRequests onSelect={setText} />
        <button type="submit" className="primary-button" disabled={loading || text.trim().length < 5}>
          {loading ? "Analyzing..." : "Analyze request"}
        </button>
      </div>
    </form>
  );
}