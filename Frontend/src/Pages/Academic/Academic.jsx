import React, { useMemo, useState } from "react";
import "./Academic.css";
import Student from '../../assets/icon/student-bg.png'


const COURSES = [
  { code: "CS101", name: "Introduction to Computer Science", credits: 3, grade: "A",   status: "Completed",   year: 2023, sem: "Fall" },
  { code: "MA201", name: "Calculus I",                        credits: 4, grade: "B+", status: "Completed",   year: 2023, sem: "Fall" },
  { code: "PH101", name: "General Physics I",                 credits: 3, grade: "A-", status: "Completed",   year: 2023, sem: "Fall" },
  { code: "EN101", name: "English Composition",               credits: 3, grade: "A",  status: "Completed",   year: 2023, sem: "Fall" },
  { code: "HIS203",name: "World History since 1500",          credits: 3, grade: "B",  status: "Completed",   year: 2023, sem: "Fall" },
  { code: "CS202",name: "Data Structures & Algorithms",       credits: 3, grade: "",   status: "In Progress", year: 2023, sem: "Fall" },
  { code: "MA205",name: "Linear Algebra",                     credits: 3, grade: "",   status: "Pending",     year: 2023, sem: "Fall" },
];

const YEARS = [2025, 2024, 2023, 2022];
const SEMS  = ["Spring", "Summer", "Fall"];

const gradeToPoints = (g) => {
  if (!g) return null;
  const key = String(g).trim().toUpperCase();
  const map = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D": 1.0, "F": 0
  };
  return map[key] ?? null;
};

function Academic() {
  const [pin, setPin]   = useState("");
  const [year, setYear] = useState(2023);
  const [sem, setSem]   = useState("Fall");
  const [q, setQ]       = useState("");

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();
    return COURSES.filter(c =>
      c.year === Number(year) &&
      c.sem === sem &&
      (
        !search ||
        c.code.toLowerCase().includes(search) ||
        c.name.toLowerCase().includes(search)
      )
    );
  }, [year, sem, q]);

  const gpa = useMemo(() => {
    let pts = 0, creds = 0;
    filtered.forEach(c => {
      const p = gradeToPoints(c.grade);
      if (p !== null) { pts += p * c.credits; creds += c.credits; }
    });
    if (!creds) return null;
    return (pts / creds).toFixed(2);
  }, [filtered]);

  return (
    <div className="acad">
      <section className="acad__hero card">
        <div className="hero__left">
          <div className="hero__content">
            <img src={Student} alt="" className="hero__icon" />
            <h1 className="hero__title">My Academic <br /> Records</h1>
          </div>
          <p className="hero__desc">
            Access your detailed academic history by entering your secure 4-digit PIN below. Your privacy is our priority.
          </p>
        </div>

        <div className="hero__right">
          <label htmlFor="pin" className="pin__label">Secure PIN</label>
          <div className="pin__field">
            <i className="fa-regular fa-square-check" aria-hidden="true" />
            <input
              id="pin"
              className="pin__input"
              type="password"
              maxLength={4}
              placeholder="Enter your 4-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <button className="btn btn--primary">Decrypt Records</button>
        </div>
      </section>

      <section className="acad__section">
        <div className="sec__header">
          <div className="sec__title">
            <i className="fa-regular fa-clipboard" aria-hidden="true" />
            Course Performance Overview
          </div>

          <div className="filters">
            <select value={year} onChange={(e)=>setYear(Number(e.target.value))}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <select value={sem} onChange={(e)=>setSem(e.target.value)}>
              {SEMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="search">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by course code or name..."
                value={q}
                onChange={(e)=>setQ(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table card">
          <div className="table__scroll">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? (
                  filtered.map(c => (
                    <tr key={c.code}>
                      <td className="mono">{c.code}</td>
                      <td>{c.name}</td>
                      <td>{c.credits}</td>
                      <td className="mono">{c.grade || "-"}</td>
                      <td>
                        <span className={`badge ${
                          c.status === "Completed" ? "ok" :
                          c.status === "In Progress" ? "warn" : "pending"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="empty">No courses found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="summary card">
        <div className="summary__title">Academic Summary</div>
        <div className="summary__grid">
          <div className="summary__meta">
            <div className="meta__label">Cumulative GPA</div>
            <div className="meta__value">{gpa ?? "—"}</div>
          </div>
          <div className="summary__note">Last Updated: October 26, 2025</div>
        </div>
      </section>
    </div>
  );
}

export default Academic;
