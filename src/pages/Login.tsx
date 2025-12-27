import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Login: ${email}`);
        }}
        style={{ display: "grid", gap: 12, maxWidth: 360 }}
      >
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            type="email"
            required
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            type="password"
            required
          />
        </label>

        <button type="submit" style={{ padding: 10 }}>
          Sign in
        </button>
      </form>
    </div>
  );
}
