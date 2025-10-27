import React from "react";
import "./PersonalInfo.css";
import Class from '../../assets/icon/class.png'
import Student from '../../assets/icon/student.png'
import Id from '../../assets/icon/id.png'
import Scur from "../../assets/icon/scurity.png"

function PersonalInfo() {
  // mock data (sau này thay bằng API)
  const profile = {
    fullName: "Alice Johnson",
    faculty : "Computer Science",
    className : "CSE 305 - Cryptography",
    studentId : "S12345678",
    email: "alex.johnson@example.edu",
    pinHash: "Student PIN Hash:1a3b75d59c2a8e46dd0f1c3a7e9b5d2",
  };

  const history = [
    { text: "Updated contact email address.", date: "2024-03-15" },
    { text: "Enrolled in new elective course.", date: "2024-02-28" },
    { text: "Changed password for security.", date: "2024-01-10" },
    { text: "Submitted final project for previous semester.", date: "2023-12-01" },
  ];

  return (
    <div className="pi">
      <h1 className="pi__title">Personal Information</h1>

      {/* Info grid */}
      <section className="pi__grid">
        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon"><i className="fa-regular fa-id-badge" aria-hidden="true" /></div>
            <div className="pi__label">Full Name</div>
          </div>
          <div className="pi__value">{profile.fullName}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon"><i className="fa-solid fa-user-graduate" aria-hidden="true" /></div>
            <div className="pi__label">Student ID</div>
          </div>
          <div className="pi__value mono">{profile.studentId}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon"><i className="fa-regular fa-building" aria-hidden="true" /></div>
            <div className="pi__label">Faculty</div>
          </div>
          <div className="pi__value">{profile.faculty}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon"><i className="fa-solid fa-chalkboard-user" aria-hidden="true" /></div>
            <div className="pi__label">Class</div>
          </div>
          <div className="pi__value">{profile.className}</div>
        </div>

        <div className="pi__card">
          <div className="pi__header">
            <div className="pi__icon"><i className="fa-regular fa-envelope" aria-hidden="true" /></div>
            <div className="pi__label">Email</div>
          </div>
          <div className="pi__value">{profile.email}</div>
        </div>
    </section>


      {/* Edit button */}
      <button className="pi__edit">
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
            <span className="mono">{profile.pinHash}</span>
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

export default PersonalInfo