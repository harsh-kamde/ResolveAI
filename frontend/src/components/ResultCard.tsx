import { useState, useEffect } from "react";
import type { TriageResult, Priority } from "../api";

interface ResultCardProps {
  result: TriageResult;
}

const PRIORITY_ACCENT: Record<Priority, string> = {
  Urgent: "var(--urgent)",
  High: "var(--high)",
  Medium: "var(--medium)",
  Low: "var(--low)",
};

export default function ResultCard({ result }: Readonly<ResultCardProps>) {
  const [draft, setDraft] = useState(result.draft_response);

  useEffect(() => {
    setDraft(result.draft_response);
  }, [result]);

  const accent = PRIORITY_ACCENT[result.priority];

  return (
    <div className="result-card" style={{ ["--card-accent" as string]: accent }}>
      <div className="result-meta-row">
        <span className="mono">
          {result.category} · → {result.owner}
        </span>
        <span className="priority-tag">
          <span className="priority-dot" />
          {result.priority}
        </span>
      </div>

      <p className="result-summary">{result.summary}</p>
      <p className="result-reason">{result.priority_reason}</p>

      <label className="draft-label">Draft response (editable)</label>
      <textarea
        className="draft-textarea"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
      />
    </div>
  );
}