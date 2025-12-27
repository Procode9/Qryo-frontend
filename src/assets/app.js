const API_BASE = "https://qryo-backend.onrender.com";

document.getElementById("loginBtn").onclick = async () => {
  const res = await fetch(API_BASE + "/healthz");
  const data = await res.json();
  alert("Backend OK: " + JSON.stringify(data));
};
