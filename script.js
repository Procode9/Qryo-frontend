const API_BASE = "https://qryo-backend.onrender.com";

document.getElementById("pingBtn").onclick = async () => {
  const out = document.getElementById("output");
  out.textContent = "Loading...";

  try {
    const res = await fetch(API_BASE + "/");
    const data = await res.json();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = "Backend unreachable";
  }
};
