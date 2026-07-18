import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./SignIn.css";

const url = "https://serverless-api-teal.vercel.app/api/auth/signin";

const SignIn = ({ isAuthenticated, onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("..........");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  async function onSubmitForm(event) {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        onLogin(data.data.token, data.data.user);
        navigate("/", { replace: true });
      } else {
        setErrorMsg(data.message || "Invalid email or password");
      }
    } catch {
      setErrorMsg("An error occurred while signing in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="s-cont">
      <div className="s-card">
        <div className="s-header">
          <div>
            <img className="p-img"src="https://res.cloudinary.com/dkspz8wwt/image/upload/v1784367374/Screenshot_2026-07-18_150511_vhzu2l.png"/>
            <h1>party menu</h1>
          </div>
          <p className="s-sub">Sign in to explore our delicious menu</p>
          {errorMsg && <div className="err-msg">{errorMsg}</div>}

          <form onSubmit={onSubmitForm} className="s-form">
            <label className="ip-group">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required />
            </label>
            <label className="ip-group">
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required />
            </label>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
