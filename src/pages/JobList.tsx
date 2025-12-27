import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

export default function JobList() {
  const nav = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useMemo(() => getToken(), []);

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchJobs() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/jobs`, {
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

      const data = (await res.json()) as Job[];
      setJobs(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function submitDemoJob() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          provider: "sim",
          payload: { hello: "world", ts: new Date().toISOString() },
        }),
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

      await fetchJobs();
    } catch (e: any) {
      setError(e?.message || "Failed to submit job");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Jobs</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={fetchJobs} disabled={loading}>Refresh</button>
          <button onClick={submitDemoJob} disabled={loading}>Submit Demo Job</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Backend: <code>{API_BASE || "(missing VITE_API_BASE)"}</code>
      </p>

      {error && (
        <div style={{ background: "#2b1b1b", border: "1px solid #5a2a2a", padding: 12, borderRadius: 8, marginTop: 12 }}>
          <b>Error:</b> {error}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        {loading && <div>Loading...</div>}

        {!loading && jobs.length === 0 && (
          <div style={{ opacity: 0.8 }}>No jobs yet. Click "Submit Demo Job".</div>
        )}

        {!loading && jobs.length > 0 && (
          <div style={{ display: "grid", gap: 12 }}>
            {jobs.map((j) => (
              <Link
                key={j.id}
                to={`/jobs/${j.id}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid #333",
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, opacity: 0.8 }}>ID</div>
                    <div style={{ fontFamily: "monospace" }}>{j.id}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, opacity: 0.8 }}>Status</div>
                    <div><b>{j.status}</b> · {j.provider}</div>
                  </div>
                </div>

                {j.error_message ? (
                  <div style={{ marginTop: 8, color: "#ff9a9a" }}>
                    <b>Error:</b> {j.error_message}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  }
