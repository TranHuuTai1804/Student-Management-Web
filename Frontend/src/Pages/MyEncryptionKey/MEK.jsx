import React, { useState } from "react";
import "./MEK.css";

function EncryptionKey() {
  // mock data
  const keyInfo = {
    status: "Active",
    keyId: "EK-2024-001-A",
    generatedAt: "2024-01-15",
    expiryAt: "2025-01-15",
  };

  const logs = [
    { date: "2024-07-20 14:30", action: "PIN Change" },
    { date: "2024-07-19 10:00", action: "Key Rotation" },
    { date: "2024-07-18 08:15", action: "Access Granted" },
    { date: "2024-07-17 17:45", action: "Login Attempt" },
    { date: "2024-07-16 11:20", action: "Security Alert" },
  ];

  // form change PIN (frontend-only)
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.current || !form.next || !form.confirm) {
      return setMsg("Please fill out all fields.");
    }
    if (form.next.length < 6) {
      return setMsg("New PIN must be at least 6 characters.");
    }
    if (form.next !== form.confirm) {
      return setMsg("New PIN and Confirm do not match.");
    }
    // TODO: call backend
    setMsg("✅ PIN updated locally (mock). Backend will be connected later.");
    setForm({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="ek">
      <div className="ek__grid">
        {/* Key status */}
        <section className="card ek__status">
          <div className="ek__statusHeader">
            <div className="ek__title one">Encryption Key Status</div>
            <span className="badge badge--ok">{keyInfo.status}</span>
          </div>

          <ul className="ek__kv">
            <li>
              <span>Key ID:</span>
              <strong className="mono">{keyInfo.keyId}</strong>
            </li>
            <li>
              <span>Generated Date:</span>
              <strong>{keyInfo.generatedAt}</strong>
            </li>
            <li>
              <span>Expiry Date:</span>
              <strong>{keyInfo.expiryAt}</strong>
            </li>
          </ul>
        </section>

        {/* Recent logs */}
        <section className="card ek__logs">
          <div className="ek__title two">Recent Update Logs</div>

          <div className="ek__logsTable">
            <div className="ek__logsHead">
              <div>Date</div>
              <div>Action</div>
            </div>
            <div className="ek__logsBody">
              {logs.map((l, i) => (
                <div className="ek__logsRow" key={i}>
                  <div className="mono">{l.date}</div>
                  <div>{l.action}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Change PIN */}
        <section className="card ek__change">
          <div className="ek__title">Change Your PIN</div>

          <form className="ek__form" onSubmit={submit}>
            <label className="ek__field">
              <input
                type="password"
                name="current"
                value={form.current}
                onChange={onChange}
                placeholder="Current PIN"
              />
            </label>

            <label className="ek__field">
              <input
                type="password"
                name="next"
                value={form.next}
                onChange={onChange}
                placeholder="New PIN (6+ characters)"
              />
            </label>

            <label className="ek__field">
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                placeholder="Confirm New PIN"
              />
            </label>

            {msg && <div className="ek__msg">{msg}</div>}

            <button className="btn btn--primary" type="submit">Change PIN</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EncryptionKey
