import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type Job = {
  id: string;
  provider: string;
  status: "queued" | "running" | "succeeded" | "failed";
  payload?: any;
  result?: any;
  error_message?: string | null;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE || "";

function getToken(): string | null {
  return localStorage.getItem("token");
}

export default function JobDetail() {
  const nav = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      nav("/login");
      return;
    }
    if (!jobId) return;
    fetchJob(jobId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  async function fetchJob(id: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        nav("/login");
        return;
      }

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Request failed: ${res.status}`);
      }

      const data = (await res.json()) as Job;
      setJob(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Job Details</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => jobId && fetchJob(jobId)} disabled={loading}>Refresh</button>
          <Link to="/jobs">Back</Link>
        </div>
      </div>

      {error && (
        <div style={{ background: "#2b1b1b", border: "1px solid #5a2a2a", padding: 12, borderRadius: 8, marginTop: 12 }}>
          <b>Error:</b> {error}
        </div>
      )}

      {loading && <div style={{ marginTop: 12 }}>Loading...</div>}

      {!loading && job && (
        <div style={{ marginTop: 16, border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div><b>ID:</b> <code>{job.id}</code></div>
            <div><b>Status:</b> {job.status}</div>
            <div><b>Provider:</b> {job.provider}</div>

            {job.error_message ? (
              <div style={{ color: "#ff9a9a" }}>
                <b>Error:</b> {job.error_message}
              </div>
            ) : null}

            <div style={{ marginTop: 12 }}>
              <h3 style={{ margin: "12px 0 6px" }}>Payload</h3>
              <pre style={{ background: "#111", padding: 12, borderRadius: 10, overflow: "auto" }}>
{JSON.stringify(job.payload ?? {}, null, 2)}
              </pre>

              <h3 style={{ margin: "12px 0 6px" }}>Result</h3>
              <pre style={{ background: "#111", padding: 12, borderRadius: 10, overflow: "auto" }}>
{JSON.stringify(job.result ?? {}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
