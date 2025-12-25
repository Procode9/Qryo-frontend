const button = document.getElementById("checkBtn");
const statusEl = document.getElementById("status");

const BACKEND_URL = "https://qryo-backend.onrender.com";

button.addEventListener("click", async () => {
  statusEl.textContent = "Checking backend...";
  statusEl.style.color = "#94a3b8";

  try {
    const res = await fetch(`${BACKEND_URL}/health`);
    if (!res.ok) throw new Error("Not OK");

    const data = await res.json();
    statusEl.textContent = `Backend online ✓ (${data.status})`;
    statusEl.style.color = "#22c55e";
  } catch (err) {
    statusEl.textContent = "Backend unreachable ✕";
    statusEl.style.color = "#ef4444";
  }
});