// frontend/app.js
(() => {
  const API_BASE = "https://qryo-backend.onrender.com";

  const $ = (id) => document.getElementById(id);

  const viewLanding = $("viewLanding");
  const viewDashboard = $("viewDashboard");

  const backendUrlText = $("backendUrlText");
  const backendStatus = $("backendStatus");

  const btnDocs = $("btnDocs");
  const btnLogout = $("btnLogout");
  const btnLogout2 = $("btnLogout2");
  const btnRefresh = $("btnRefresh");

  const goRegister = $("goRegister");
  const goLogin = $("goLogin");

  const formRegister = $("formRegister");
  const formLogin = $("formLogin");
  const formJob = $("formJob");

  const msgRegister = $("msgRegister");
  const msgLogin = $("msgLogin");
  const msgJob = $("msgJob");

  const meEmail = $("meEmail");
  const jobsList = $("jobsList");
  const jobsCount = $("jobsCount");

  function setMsg(el, text, cls = "") {
    el.className = "msg " + cls;
    el.textContent = text || "";
  }

  function getToken() {
    return localStorage.getItem("token") || "";
  }

  function setToken(token) {
    localStorage.setItem("token", token);
  }

  function clearToken() {
    localStorage.removeItem("token");
  }

  async function api(path, opts = {}) {
    const headers = opts.headers || {};
    headers["Content-Type"] = "application/json";

    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      const detail = (data && data.detail) ? data.detail : `HTTP ${res.status}`;
      throw new Error(detail);
    }
    return data;
  }

  async function checkBackend() {
    backendUrlText.textContent = API_BASE;
    try {
      await api("/healthz", { method: "GET" });
      backendStatus.textContent = "OK";
    } catch (e) {
      backendStatus.textContent = "DOWN / CORS / URL?";
    }
  }

  function showDashboard() {
    viewLanding.style.display = "none";
    viewDashboard.style.display = "";
    btnLogout.style.display = "";
  }

  function showLanding() {
    viewDashboard.style.display = "none";
    viewLanding.style.display = "";
    btnLogout.style.display = "none";
  }

  function statusBadge(status) {
    if (status === "succeeded") return `<span class="badge ok">${status}</span>`;
    if (status === "failed") return `<span class="badge bad">${status}</span>`;
    if (status === "running") return `<span class="badge warn">${status}</span>`;
    return `<span class="badge">${status}</span>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
    }[c]));
  }

  function renderJobs(jobs) {
    jobsCount.textContent = `${jobs.length} job`;
    if (!jobs.length) {
      jobsList.innerHTML = `<div class="small">Henüz job yok. Soldan bir job gönder.</div>`;
      return;
    }

    jobsList.innerHTML = jobs.map(j => {
      const payload = JSON.stringify(j.payload || {}, null, 2);
      const result = JSON.stringify(j.result || {}, null, 2);
      const err = j.error_message ? `<div class="code">${escapeHtml(j.error_message)}</div>` : "";

      return `
        <div class="job">
          <div class="job-top">
            <div class="small"><b>${escapeHtml(j.id)}</b> • provider: <b>${escapeHtml(j.provider)}</b></div>
            ${statusBadge(j.status)}
          </div>
          <div class="code"><b>payload</b>\n${escapeHtml(payload)}</div>
          <div class="code"><b>result</b>\n${escapeHtml(result)}</div>
          ${err}
        </div>
      `;
    }).join("");
  }

  async function loadMeAndJobs() {
    const me = await api("/me", { method: "GET" });
    meEmail.textContent = me.email;

    const jobs = await api("/jobs", { method: "GET" });
    renderJobs(jobs);
  }

  async function ensureSessionOrLanding() {
    const token = getToken();
    if (!token) {
      showLanding();
      return;
    }
    try {
      showDashboard();
      await loadMeAndJobs();
    } catch {
      clearToken();
      showLanding();
    }
  }

  // Events
  btnDocs.addEventListener("click", () => {
    window.open(`${API_BASE}/docs`, "_blank");
  });

  function doLogout() {
    clearToken();
    showLanding();
    setMsg(msgLogin, "", "");
    setMsg(msgRegister, "", "");
    setMsg(msgJob, "", "");
  }

  btnLogout.addEventListener("click", doLogout);
  btnLogout2.addEventListener("click", doLogout);

  btnRefresh.addEventListener("click", async () => {
    setMsg(msgJob, "Yenileniyor…", "");
    try {
      await loadMeAndJobs();
      setMsg(msgJob, "Güncel.", "ok");
    } catch (e) {
      setMsg(msgJob, e.message, "bad");
    }
  });

  goRegister.addEventListener("click", () => {
    document.querySelector("#formRegister input[name=email]")?.focus();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  goLogin.addEventListener("click", () => {
    document.querySelector("#formLogin input[name=email]")?.focus();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(msgRegister, "Kayıt yapılıyor…", "");
    const fd = new FormData(formRegister);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      setToken(data.token);
      setMsg(msgRegister, "Kayıt tamam. Dashboard açılıyor…", "ok");
      showDashboard();
      await loadMeAndJobs();
    } catch (err) {
      setMsg(msgRegister, err.message, "bad");
    }
  });

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(msgLogin, "Giriş yapılıyor…", "");
    const fd = new FormData(formLogin);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      setToken(data.token);
      setMsg(msgLogin, "Giriş başarılı. Dashboard açılıyor…", "ok");
      showDashboard();
      await loadMeAndJobs();
    } catch (err) {
      setMsg(msgLogin, err.message, "bad");
    }
  });

  formJob.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(msgJob, "Job gönderiliyor…", "");
    const fd = new FormData(formJob);
    const raw = String(fd.get("payload") || "{}");

    let payload = {};
    try {
      payload = JSON.parse(raw);
    } catch {
      setMsg(msgJob, "Payload JSON olmalı. Örn: { \"qbits\": 4, \"shots\": 128 }", "bad");
      return;
    }

    try {
      await api("/jobs", {
        method: "POST",
        body: JSON.stringify({ provider: "sim", payload })
      });

      setMsg(msgJob, "Gönderildi. 2 saniye sonra refresh…", "ok");
      setTimeout(async () => {
        try {
          await loadMeAndJobs();
        } catch {}
      }, 2200);
    } catch (err) {
      setMsg(msgJob, err.message, "bad");
    }
  });

  // Init
  (async function init() {
    await checkBackend();
    await ensureSessionOrLanding();
  })();
})();
