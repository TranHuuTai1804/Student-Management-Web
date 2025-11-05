import React, { useEffect, useState } from "react";
import "./PersonalInfo.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function PersonalInfo() {
  // state hiển thị (giữ nguyên key như mock cũ)
  const [profile, setProfile] = useState({
    fullName: "",
    faculty: "",
    className: "",
    studentId: "",
    email: "",
    pinHash: "", // chưa có API -> giữ chỗ
  });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // vẫn giữ danh sách history tĩnh (sau có API thì thay)
  const history = [
    { text: "Updated contact email address.", date: "2024-03-15" },
    { text: "Enrolled in new elective course.", date: "2024-02-28" },
    { text: "Changed password for security.", date: "2024-01-10" },
    { text: "Submitted final project for previous semester.", date: "2023-12-01" },
  ];

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        // Lấy hồ sơ theo ROLE (backend đã map cho SINHVIEN)
        const r = await fetch(`${API_BASE}/auth/profile/me`, {
          credentials: "include",
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();

        if (!dead) {
          setProfile({
            fullName: data?.name || "",
            faculty: data?.faculty || "",
            className: data?.className || "",
            studentId: data?.studentId || "",
            email: data?.email || "",
            pinHash: data?.pinHash || "Student PIN Hash: —", // nếu sau có API thì điền thật
          });
        }
      } catch (e) {
        if (!dead) setErr(e.message || "Failed to load profile");
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => {
      dead = true;
    };
  }, []);

  return (
    <div className="pi">
      <h1 className="pi__title">Personal Information</h1>
      {!!err && (
        <div style={{ margin: "8px 0", color: "var(--warn, #c00)" }}>
          Error: {err}
        </div>
      )}

      {/* Info grid */}
      <section className="pi__grid">
        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon">
              <i className="fa-regular fa-id-badge" aria-hidden="true" />
            </div>
            <div className="pi__label">Full Name</div>
          </div>
          <div className="pi__value">{loading ? "…" : profile.fullName || "—"}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon">
              <i className="fa-solid fa-user-graduate" aria-hidden="true" />
            </div>
            <div className="pi__label">Student ID</div>
          </div>
          <div className="pi__value mono">{loading ? "…" : profile.studentId || "—"}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon">
              <i className="fa-regular fa-building" aria-hidden="true" />
            </div>
            <div className="pi__label">Faculty</div>
          </div>
          <div className="pi__value">{loading ? "…" : profile.faculty || "—"}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon">
              <i className="fa-solid fa-chalkboard-user" aria-hidden="true" />
            </div>
            <div className="pi__label">Class</div>
          </div>
          <div className="pi__value">{loading ? "…" : profile.className || "—"}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon">
              <i className="fa-regular fa-envelope" aria-hidden="true" />
            </div>
            <div className="pi__label">Email</div>
          </div>
          <div className="pi__value">{loading ? "…" : profile.email || "—"}</div>
        </div>
      </section>

      {/* Edit button (giữ nguyên UI) */}
      <button className="pi__edit" disabled={loading}>
        <i className="fa-regular fa-pen-to-square" aria-hidden="true" />
        Edit Information
      </button>

      {/* Update history */}
      <section className="pi__history card">
        <div className="pi__historyTitle">Update History</div>
        <ul className="pi__historyList">
          {history.map((h, idx) => (
            <li key={idx}>
              <span>{h.text}</span>
              <time>{h.date}</time>
            </li>
          ))}
        </ul>
      </section>

      {/* Security + Sync */}
      <section className="pi__row2">
        <div className="pi__mini card">
          <div className="pi__miniTitle">Security Summary</div>
          <div className="pi__kv">
            <i className="fa-solid fa-key" aria-hidden="true" />
            <span className="mono">{loading ? "…" : profile.pinHash}</span>
          </div>
          <p className="pi__subtle">
            For security, your PIN is hashed. Do not share your PIN with anyone.
          </p>
        </div>

        <div className="pi__mini card">
          <div className="pi__miniTitle">Data Sync Status</div>
          <div className="pi__kv">
            <i className="fa-regular fa-circle-check" aria-hidden="true" />
            <span>All data is synchronized.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalInfo;
