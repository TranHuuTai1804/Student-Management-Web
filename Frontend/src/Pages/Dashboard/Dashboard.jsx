import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Class from "../../assets/icon/class.png";
import Key from "../../assets/icon/key.png";
import Student from "../../assets/icon/student.png";
import Id from "../../assets/icon/id.png";
import Scur from "../../assets/icon/scurity.png";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Dashboard() {
  // dữ liệu hiển thị (giữ nguyên tên biến như bố cục gốc)
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [className, setClassName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [keyStatus, setKeyStatus] = useState("Unverified");

  // trạng thái
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        // gọi API lấy hồ sơ theo ROLE (đã yêu cầu trước đó)
        const r = await fetch(`${API_BASE}/auth/profile/me`, {
          credentials: "include",
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();

        if (!dead) {
          setName(data?.name || "");
          setFaculty(data?.faculty || "");
          setClassName(data?.className || "");
          setStudentId(data?.studentId || "");
          setKeyStatus(data?.keyStatus || "Unverified");
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

  // (tùy chọn) handler Verify — bạn nối với API thật nếu có
  const onVerifyClick = async () => {
    // ví dụ: POST /auth/key/verify
    // await fetch(`${API_BASE}/auth/key/verify`, { method:'POST', credentials:'include' })
    //   .then(() => setKeyStatus("Verified"))
    //   .catch(() => setKeyStatus("Unverified"));
    alert("Verify action here!");
  };

  return (
    <div className="dash">
      <section className="dash__greet">
        <h1 className="dash__title">
          Hello, {loading ? "…" : name || "—"} <span className="wave">👋</span>
        </h1>
        <p className="dash__subtitle">
          Welcome to your student portal. Here you can manage your academic progress, personal information, and encryption keys.
        </p>
        {!!err && (
          <div style={{ marginTop: 8, color: "var(--warn, #c00)" }}>
            Error: {err}
          </div>
        )}
      </section>

      <section className="dash__grid4">
        <div className="card info">
          <img src={Student} alt="" className="info_icon" />
          <div className="info__title">Faculty</div>
          <div className="info__value">{loading ? "…" : faculty || "—"}</div>
        </div>

        <div className="card info">
          <img src={Class} alt="" className="info_icon" />
          <div className="info__title">Class</div>
          <div className="info__value">{loading ? "…" : className || "—"}</div>
        </div>

        <div className="card info">
          <img src={Id} alt="" className="info_icon" />
          <div className="info__title">Student ID</div>
          <div className="info__value id">{loading ? "…" : studentId || "—"}</div>
        </div>

        <div className="card info">
          <img src={Key} alt="" className="info_icon" />
          <div className="info__title">Key Status</div>
          <div className={`status ${keyStatus === "Verified" ? "ok" : "warn"}`}>
            {loading ? "…" : keyStatus}
          </div>
          <button className="btn btn--verify" onClick={onVerifyClick} disabled={loading}>
            Verify
          </button>
        </div>
      </section>

      <section className="card dash__security">
        <div className="sec__text">
          <img src={Scur} alt="" className="shield" />
          <div className="sec__title">Security Summary</div>
        </div>
        <div className="sec__desc">
          Your data is protected with advanced encryption. Regularly verify your encryption key for enhanced security.
        </div>
      </section>

      <section className="dash__grid2">
        <div className="card list">
          <div className="list__title">Recent Activity</div>
          <ul className="list__items">
            <li>
              <span>Accessed encryption key</span>
              <time>2 hours ago</time>
            </li>
            <li>
              <span>Updated personal information</span>
              <time>Yesterday</time>
            </li>
            <li>
              <span>Submitted assignment ‘Cryptography Basics’</span>
              <time>3 days ago</time>
            </li>
            <li>
              <span>Received new notification</span>
              <time>1 week ago</time>
            </li>
          </ul>
        </div>

        <div className="card list">
          <div className="list__title">Last Login</div>
          <ul className="last__items">
            <li>
              <span className="dot dot--time" />
              <div>
                <div>March 8, 2024, 10:30 AM</div>
              </div>
            </li>
            <li>
              <span className="dot dot--loc" />
              <div>
                <div>New York, USA</div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
