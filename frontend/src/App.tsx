import { useState } from "react";
import RequestForm from "./components/RequestForm";
import ResultCard from "./components/ResultCard";
import { triageRequest } from "./api";
import type { TriageResult } from "./api";

export default function App() {
  const [result, setResult] = useState<TriageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(text: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await triageRequest(text);
      setResult(data);
    } catch (err) {
      setError("Something went wrong analyzing this request. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>ResolveAI</h1>
        <p>Turn an unstructured request into a routed, prioritized reply.</p>
      </header>

      <RequestForm onSubmit={handleSubmit} loading={loading} />

      {error && <p className="error-text">{error}</p>}
      {result && <ResultCard result={result} />}
    </div>
  );
}