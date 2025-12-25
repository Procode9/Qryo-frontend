const API_BASE = "https://qryo-backend.onrender.com";

async function pingAPI() {
  const out = document.getElementById("output");
  out.textContent = "Loading...";

  try {
    const res = await fetch(API_BASE + "/");
    const data = await res.json();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    out.textContent = "API not reachable";
  }
}