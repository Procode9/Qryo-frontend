const API_BASE = "https://qryo-backend.onrender.com";

async function checkBackend() {
  const statusEl = document.getElementById("status");
  statusEl.textContent = "Checking backend...";

  try {
    const res = await fetch(API_BASE);
    const data = await res.json();

    statusEl.textContent = "Backend OK ✅";
    statusEl.style.color = "#22c55e";
  } catch (err) {
    statusEl.textContent = "Backend not reachable ❌";
    statusEl.style.color = "#ef4444";
  }
}

document.getElementById("checkBtn").addEventListener("click", checkBackend);
