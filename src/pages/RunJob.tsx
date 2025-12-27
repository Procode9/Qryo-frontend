import { useMemo, useState } from "react";

type Provider = "auto" | "ibm_q" | "azure_q" | "dwave";

type NormalizedResult = {
  backend: string;
  shots?: number;
  runtime_ms?: number;
  cost_estimate?: number;
  measurement?: Record<string, number>;
  raw?: unknown;
};

const sampleQasm = `OPENQASM 2.0;
include "qelib1.inc";
qreg q[2];
creg c[2];
h q[0];
cx q[0],q[1];
measure q[0] -> c[0];
measure q[1] -> c[1];`;

const sampleJson = `{
  "type": "qasm",
  "qasm": "OPENQASM 2.0; include \\"qelib1.inc\\"; qreg q[2]; creg c[2]; h q[0]; cx q[0],q[1]; measure q[0] -> c[0]; measure q[1] -> c[1];"
}`;

function guessKind(text: string): "qasm" | "json" | "csv" | "unknown" {
  const t = text.trim();
  if (!t) return "unknown";
  if (t.startsWith("{") || t.startsWith("[")) return "json";
  if (t.includes("OPENQASM") || t.includes("qreg") || t.includes("creg")) return "qasm";
  if (t.includes(",") && t.split("\n").length >= 2) return "csv";
  return "unknown";
}

function prettyJson(obj: unknown) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

export default function RunJob() {
  const [provider, setProvider] = useState<Provider>("auto");
  const [shots, setShots] = useState<number>(1024);
  const [tags, setTags] = useState<string>("homework");
  const [fileName, setFileName] = useState<string>("");
  const [text, setText] = useState<string>(sampleQasm);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobId, setJobId] = useState<string>("");
  const [result, setResult] = useState<NormalizedResult | null>(null);
  const [error, setError] = useState<string>("");

  const kind = useMemo(() => guessKind(text), [text]);

  const styles = {
    page: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "24px 16px 64px",
    } as const,
    header: {
      display: "flex",
      gap: 16,
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 18,
    } as const,
    title: { fontSize: 28, fontWeight: 800, letterSpacing: -0.4 } as const,
    subtitle: { opacity: 0.78, marginTop: 6, fontSize: 14 } as const,
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 16,
    } as const,
    card: {
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.03)",
      borderRadius: 16,
      padding: 16,
      backdropFilter: "blur(10px)",
    } as const,
    row: { display: "grid", gridTemplateColumns: "1fr", gap: 12 } as const,
    label: { fontSize: 12, opacity: 0.78, marginBottom: 6 } as const,
    input: {
      width: "100%",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(0,0,0,0.25)",
      color: "white",
      padding: "10px 12px",
      outline: "none",
    } as const,
    textarea: {
      width: "100%",
      minHeight: 280,
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(0,0,0,0.25)",
      color: "white",
      padding: 12,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      fontSize: 13,
      lineHeight: 1.5,
      outline: "none",
      resize: "vertical" as const,
    } as const,
    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.04)",
      fontSize: 12,
      opacity: 0.9,
    } as const,
    actions: { display: "flex", flexWrap: "wrap" as const, gap: 10, alignItems: "center" } as const,
    btn: {
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.06)",
      color: "white",
      padding: "10px 12px",
      fontWeight: 700,
      cursor: "pointer",
    } as const,
    btnPrimary: {
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "linear-gradient(135deg, rgba(84,130,255,0.7), rgba(167,81,255,0.6))",
      color: "white",
      padding: "10px 14px",
      fontWeight: 800,
      cursor: "pointer",
    } as const,
    small: { fontSize: 12, opacity: 0.8 } as const,
    twoCol: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 12,
    } as const,
  };

  // responsive quick hack
  const isWide = typeof window !== "undefined" && window.matchMedia?.("(min-width: 900px)").matches;
  if (isWide) {
    styles.grid.gridTemplateColumns = "1.2fr 0.8fr";
    styles.twoCol.gridTemplateColumns = "1fr 1fr";
    styles.row.gridTemplateColumns = "1fr 1fr";
  }

  async function onPickFile(file: File) {
    setError("");
    setFileName(file.name);
    const content = await file.text();
    setText(content);
  }

  async function submitJob() {
    setError("");
    setResult(null);
    setJobId("");
    setIsSubmitting(true);

    try {
      // TODO: backend bağlanınca burayı gerçek endpoint’e çevir:
      // POST /submit-job  body: { provider, input_kind, payload, shots, tags }
      //
      // Şimdilik DEMO: 700ms sonra fake jobId + fake normalized result
      await new Promise((r) => setTimeout(r, 700));
      const fakeId = "job_" + Math.random().toString(16).slice(2, 10);
      setJobId(fakeId);

      const fake: NormalizedResult = {
        backend: provider === "auto" ? "auto_selected" : provider,
        shots,
        runtime_ms: 2300,
        cost_estimate: 1.72,
        measurement: { "00": 512, "01": 256, "10": 128, "11": 128 },
        raw: { kind, tags, fileName: fileName || null },
      };
      setResult(fake);
    } catch (e: any) {
      setError(e?.message || "Job submit sırasında hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function loadSample(which: "qasm" | "json") {
    setError("");
    setFileName("");
    setText(which === "qasm" ? sampleQasm : sampleJson);
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Devreni ver</div>
          <div style={styles.subtitle}>
            Tek panel → seç/auto → çalıştır → <b>tek format</b> sonuç.
          </div>
        </div>

        <div style={styles.actions}>
          <span style={styles.pill}>
            Input türü: <b>{kind}</b>
          </span>
          {fileName ? (
            <span style={styles.pill}>
              Dosya: <b>{fileName}</b>
            </span>
          ) : null}
        </div>
      </div>

      <div style={styles.grid}>
        {/* LEFT: Input */}
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontWeight: 800 }}>Input</div>
            <div style={styles.actions}>
              <button style={styles.btn} type="button" onClick={() => loadSample("qasm")}>
                QASM örnek
              </button>
              <button style={styles.btn} type="button" onClick={() => loadSample("json")}>
                JSON örnek
              </button>

              <label style={{ ...styles.btn, display: "inline-flex", gap: 8, alignItems: "center" }}>
                Dosya yükle
                <input
                  type="file"
                  accept=".qasm,.txt,.json,.csv"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onPickFile(f);
                  }}
                />
              </label>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <textarea
              style={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="QASM / JSON / CSV yapıştır veya dosya yükle"
            />
          </div>

          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={styles.small}>
              İpucu: QASM / JSON / CSV destekle. (MVP’de “qasm + provider + run” yeter.)
            </div>
            <div style={styles.small}>Normalized output: backend / shots / runtime / cost / measurement</div>
          </div>
        </div>

        {/* RIGHT: Controls + Result */}
        <div style={{ display: "grid", gap: 16 }}>
          <div style={styles.card}>
            <div style={{ fontWeight: 800, marginBottom: 12 }}>Çalıştır</div>

            <div style={styles.twoCol}>
              <div>
                <div style={styles.label}>Provider</div>
                <select
                  style={styles.input}
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as Provider)}
                >
                  <option value="auto">auto (QRYO seçsin)</option>
                  <option value="ibm_q">IBM Quantum</option>
                  <option value="azure_q">Azure Quantum</option>
                  <option value="dwave">D-Wave</option>
                </select>
              </div>

              <div>
                <div style={styles.label}>Shots</div>
                <input
                  style={styles.input}
                  type="number"
                  min={1}
                  max={100000}
                  value={shots}
                  onChange={(e) => setShots(Number(e.target.value || 0))}
                />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={styles.label}>Etiketler (opsiyonel)</div>
              <input
                style={styles.input}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="homework, demo, thesis..."
              />
              <div style={{ marginTop: 8, ...styles.small }}>
                Örn: <b>homework</b> etiketi ile eğitim sandbox / kredi politikası bağlanır.
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button
                style={styles.btnPrimary}
                type="button"
                onClick={submitJob}
                disabled={isSubmitting || !text.trim()}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Çalıştırılıyor..." : "Run"}
              </button>

              {jobId ? <span style={styles.pill}>Job ID: <b>{jobId}</b></span> : null}
              {error ? <span style={{ ...styles.pill, borderColor: "rgba(255,80,80,0.35)" }}>{error}</span> : null}
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Output (Normalized)</div>

            {result ? (
              <>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={styles.row}>
                    <div style={styles.pill}>
                      Backend: <b>{result.backend}</b>
                    </div>
                    <div style={styles.pill}>
                      Shots: <b>{result.shots ?? "-"}</b>
                    </div>
                    <div style={styles.pill}>
                      Runtime: <b>{result.runtime_ms ?? "-"} ms</b>
                    </div>
                    <div style={styles.pill}>
                      Cost: <b>{result.cost_estimate ?? "-"} $</b>
                    </div>
                  </div>

                  <div>
                    <div style={styles.label}>Measurement</div>
                    <pre style={{ ...styles.textarea, minHeight: 160 }}>
                      {prettyJson(result.measurement ?? {})}
                    </pre>
                  </div>

                  <div>
                    <div style={styles.label}>Raw (debug)</div>
                    <pre style={{ ...styles.textarea, minHeight: 120 }}>
                      {prettyJson(result.raw ?? {})}
                    </pre>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ opacity: 0.8, fontSize: 14 }}>
                Henüz sonuç yok. Devreni ver → Provider seç → <b>Run</b>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
    }
