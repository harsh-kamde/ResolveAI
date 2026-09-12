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

const CATEGORY_ICONS: Record<string, string> = {
  Sales: "💼",
  Support: "🆘",
  Billing: "💳",
  Technical: "⚙️",
  Other: "📋",
};

const OWNER_ICONS: Record<string, string> = {
  "Sales Team": "👥",
  "Client Success": "🤝",
  Finance: "💰",
  Engineering: "🔧",
};

export default function ResultCard({ result }: Readonly<ResultCardProps>) {
  const [draft, setDraft] = useState(result.draft_response);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setDraft(result.draft_response);
  }, [result]);

  const accent = PRIORITY_ACCENT[result.priority];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setNotification("✓ Copied to clipboard!");
      setTimeout(() => {
        setCopied(false);
        setNotification(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setNotification("✗ Failed to copy");
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleExportEmail = () => {
    const subject = encodeURIComponent(`Client Request - ${result.category}: ${result.summary}`);
    const body = encodeURIComponent(
      `Category: ${result.category}\nPriority: ${result.priority}\nOwner: ${result.owner}\n\nPriority Reason: ${result.priority_reason}\n\nDraft Response:\n${draft}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setNotification("📧 Opening email...");
    setTimeout(() => setNotification(null), 1500);
  };

  const handleExportPDF = () => {
    const element = document.querySelector(".result-card");
    if (!element) return;

    const printWindow = window.open("", "", "height=600,width=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>ResolveAI - ${result.category}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          .header { border-bottom: 2px solid #0969da; padding-bottom: 10px; margin-bottom: 20px; }
          .section { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0969da; }
          .value { color: #333; margin-top: 5px; }
          .response { background: #f0f2f5; padding: 10px; border-radius: 5px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>ResolveAI - Request Triage</h2>
          <p><strong>Summary:</strong> ${result.summary}</p>
        </div>
        <div class="section">
          <div class="label">Category</div>
          <div class="value">${result.category}</div>
        </div>
        <div class="section">
          <div class="label">Priority</div>
          <div class="value">${result.priority} - ${result.priority_reason}</div>
        </div>
        <div class="section">
          <div class="label">Route To</div>
          <div class="value">${result.owner}</div>
        </div>
        <div class="section">
          <div class="label">Draft Response</div>
          <div class="response">${draft}</div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      setNotification("📄 Printing PDF...");
      setTimeout(() => setNotification(null), 1500);
    }, 250);
  };

  return (
    <div className="result-card" style={{ ["--card-accent" as string]: accent }}>
      {notification && <div className="notification">{notification}</div>}

      <div className="result-header">
        <h2 className="result-summary">{result.summary}</h2>
      </div>

      <div className="badges-grid">
        <div className="badge category-badge">
          <span className="badge-icon">{CATEGORY_ICONS[result.category] || "📋"}</span>
          <div className="badge-content">
            <div className="badge-label">Category</div>
            <div className="badge-value">{result.category}</div>
          </div>
        </div>

        <div className="badge owner-badge">
          <span className="badge-icon">{OWNER_ICONS[result.owner] || "👤"}</span>
          <div className="badge-content">
            <div className="badge-label">Route To</div>
            <div className="badge-value">{result.owner}</div>
          </div>
        </div>

        <div className="badge priority-badge" style={{ ["--priority-color" as string]: accent }}>
          <span className="badge-icon">⚡</span>
          <div className="badge-content">
            <div className="badge-label">Priority</div>
            <div className="badge-value">{result.priority}</div>
          </div>
        </div>
      </div>

      <div className="reason-box">
        <span className="reason-icon">💡</span>
        <p className="result-reason">{result.priority_reason}</p>
      </div>

      <div className="draft-section">
        <div className="draft-header">
          <label className="draft-label">📝 Draft Response (Editable)</label>
          <div className="action-buttons">
            <button
              className={`action-button copy-button ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title="Copy response to clipboard"
            >
              {copied ? "✓ Copied" : "📋 Copy"}
            </button>
            <button
              className="action-button email-button"
              onClick={handleExportEmail}
              title="Send via email"
            >
              📧 Email
            </button>
            <button
              className="action-button pdf-button"
              onClick={handleExportPDF}
              title="Export as PDF"
            >
              📄 PDF
            </button>
          </div>
        </div>
        <textarea
          className="draft-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}