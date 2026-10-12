import React from 'react';
import { useState } from "react";

function Login({ onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!membershipId.trim()) {
      setError("Please enter your membership ID.");
      return;
    }

    const success = onLogin(membershipId);

    if (!success) {
      setError("Membership ID was not found.");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Community Library</h1>
        <p>Library Management System</p>

        <label>Membership ID</label>
        <input
          value={membershipId}
          onChange={(event) => setMembershipId(event.target.value)}
          placeholder="Example: ADMIN001"
        />

        {error && <p className="error">{error}</p>}

        <button className="primary-button" type="submit">
          Login
        </button>

        <div className="login-help">
          <strong>Demo accounts</strong>
          <span>ADMIN001 - Admin</span>
          <span>MEM001 - Member</span>
        </div>
      </form>
    </div>
  );
}

export default Login;