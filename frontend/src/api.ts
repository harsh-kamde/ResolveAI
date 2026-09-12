import axios from "axios";

export type Category = "Sales" | "Support" | "Billing" | "Technical" | "Other";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Owner = "Sales Team" | "Client Success" | "Finance" | "Engineering";

export interface TriageResult {
  summary: string;
  category: Category;
  priority: Priority;
  priority_reason: string;
  owner: Owner;
  draft_response: string;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
});

export async function triageRequest(requestText: string): Promise<TriageResult> {
  const response = await apiClient.post<TriageResult>("/triage", {
    request_text: requestText,
  });
  return response.data;
}