import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("login_dark_mode"));
    if (typeof saved === "boolean") setDarkMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("login_dark_mode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/login", formData);
      const data = res.data;

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      if (data.role === "EMPLOYEE") navigate("/employee");
      else if (data.role === "HR") navigate("/hr");
      else if (data.role === "MANAGER") navigate("/manager");
      else navigate("/unauthorized");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={darkMode ? styles.pageDark : styles.pageLight}>
      <div style={styles.blobOne}></div>
      <div style={styles.blobTwo}></div>
      <div style={styles.blobThree}></div>

      <div style={styles.navbar}>
        <div style={darkMode ? styles.logoDark : styles.logoLight}>
          <span style={styles.logoBox}>P</span>
          <span>Policy AI Portal</span>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={darkMode ? styles.themeBtnDark : styles.themeBtnLight}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <div style={darkMode ? styles.containerDark : styles.containerLight}>
        <div style={styles.leftPanel}>
          <div style={styles.badge}>AI Powered RBAC System</div>

          <h1 style={styles.heading}>
            Secure Login for <br />
            Smart Policy Assistant
          </h1>

          <p style={styles.desc}>
            Login with your role and access your personalized dashboard for
            Employee, HR, and Manager workflows.
          </p>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3>3</h3>
              <p>User Roles</p>
            </div>
            <div style={styles.statCard}>
              <h3>JWT</h3>
              <p>Secure Auth</p>
            </div>
            <div style={styles.statCard}>
              <h3>AI</h3>
              <p>Policy Help</p>
            </div>
          </div>

          <div style={styles.roleFlow}>
            <span>Employee</span>
            <span>HR</span>
            <span>Manager</span>
          </div>
        </div>

        <div style={darkMode ? styles.loginCardDark : styles.loginCardLight}>
          <h2 style={darkMode ? styles.titleDark : styles.titleLight}>
            Welcome Back
          </h2>

          <p style={darkMode ? styles.subDark : styles.subLight}>
            Enter your credentials to continue
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <div>
              <label style={darkMode ? styles.labelDark : styles.labelLight}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                style={darkMode ? styles.inputDark : styles.inputLight}
                required
              />
            </div>

            <div>
              <label style={darkMode ? styles.labelDark : styles.labelLight}>
                Password
              </label>

              <div style={darkMode ? styles.passwordDark : styles.passwordLight}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  style={darkMode ? styles.passwordInputDark : styles.passwordInputLight}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {message && <div style={styles.errorBox}>{message}</div>}

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.loginBtnDisabled : styles.loginBtn}
            >
              {loading ? "Signing In..." : "Login Now"}
            </button>
          </form>

          <p style={darkMode ? styles.registerDark : styles.registerLight}>
            New user?{" "}
            <Link to="/register" style={styles.link}>
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-25px) scale(1.05); }
            100% { transform: translateY(0px) scale(1); }
          }

          @media (max-width: 850px) {
            .login-responsive {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  pageDark: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #050816, #111827, #312e81)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, Arial, sans-serif",
  },

  pageLight: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc, #e0f2fe, #ede9fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, Arial, sans-serif",
  },

  blobOne: {
    position: "absolute",
    width: "330px",
    height: "330px",
    borderRadius: "50%",
    background: "rgba(236, 72, 153, 0.35)",
    top: "-90px",
    left: "-80px",
    filter: "blur(90px)",
    animation: "float 6s ease-in-out infinite",
  },

  blobTwo: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(34, 211, 238, 0.32)",
    bottom: "-100px",
    right: "-80px",
    filter: "blur(100px)",
    animation: "float 7s ease-in-out infinite",
  },

  blobThree: {
    position: "absolute",
    width: "230px",
    height: "230px",
    borderRadius: "50%",
    background: "rgba(168, 85, 247, 0.30)",
    top: "40%",
    left: "45%",
    filter: "blur(90px)",
    animation: "float 8s ease-in-out infinite",
  },

  navbar: {
    position: "absolute",
    top: "22px",
    width: "100%",
    maxWidth: "1150px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
    padding: "0 20px",
    boxSizing: "border-box",
  },

  logoDark: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "800",
    fontSize: "18px",
  },

  logoLight: {
    color: "#111827",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "800",
    fontSize: "18px",
  },

  logoBox: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #ec4899, #06b6d4)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  themeBtnDark: {
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.10)",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
  },

  themeBtnLight: {
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    padding: "10px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
  },

  containerDark: {
    width: "100%",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    borderRadius: "32px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(22px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.40)",
    position: "relative",
    zIndex: 2,
  },

  containerLight: {
    width: "100%",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    borderRadius: "32px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(148,163,184,0.22)",
    backdropFilter: "blur(22px)",
    boxShadow: "0 30px 80px rgba(15,23,42,0.12)",
    position: "relative",
    zIndex: 2,
  },

  leftPanel: {
    padding: "58px 45px",
    background:
      "linear-gradient(135deg, rgba(236,72,153,0.95), rgba(124,58,237,0.95), rgba(6,182,212,0.95))",
    color: "#fff",
  },

  badge: {
    width: "fit-content",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: "13px",
    fontWeight: "800",
    marginBottom: "24px",
  },

  heading: {
    margin: 0,
    fontSize: "40px",
    lineHeight: "1.18",
    fontWeight: "900",
  },

  desc: {
    marginTop: "18px",
    fontSize: "16px",
    lineHeight: "1.7",
    opacity: 0.95,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    marginTop: "32px",
  },

  statCard: {
    padding: "18px 12px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.18)",
    textAlign: "center",
  },

  roleFlow: {
    marginTop: "28px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  loginCardDark: {
    padding: "58px 42px",
    background: "rgba(2,6,23,0.55)",
  },

  loginCardLight: {
    padding: "58px 42px",
    background: "rgba(255,255,255,0.72)",
  },

  titleDark: {
    color: "#fff",
    fontSize: "32px",
    margin: 0,
    fontWeight: "900",
  },

  titleLight: {
    color: "#111827",
    fontSize: "32px",
    margin: 0,
    fontWeight: "900",
  },

  subDark: {
    color: "#cbd5e1",
    marginTop: "8px",
    marginBottom: "26px",
  },

  subLight: {
    color: "#64748b",
    marginTop: "8px",
    marginBottom: "26px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  labelDark: {
    color: "#e5e7eb",
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "8px",
    display: "block",
  },

  labelLight: {
    color: "#374151",
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "8px",
    display: "block",
  },

  inputDark: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  inputLight: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  passwordDark: {
    display: "flex",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  passwordLight: {
    display: "flex",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    background: "#fff",
    overflow: "hidden",
  },

  passwordInputDark: {
    flex: 1,
    padding: "15px 16px",
    border: "none",
    background: "transparent",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  },

  passwordInputLight: {
    flex: 1,
    padding: "15px 16px",
    border: "none",
    background: "transparent",
    color: "#111827",
    outline: "none",
    fontSize: "15px",
  },

  eyeBtn: {
    border: "none",
    background: "transparent",
    padding: "0 16px",
    cursor: "pointer",
    fontSize: "18px",
  },

  errorBox: {
    padding: "13px 15px",
    borderRadius: "14px",
    background: "rgba(239,68,68,0.13)",
    border: "1px solid rgba(239,68,68,0.35)",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "700",
  },

  loginBtn: {
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "900",
    cursor: "pointer",
    boxShadow: "0 16px 35px rgba(124,58,237,0.35)",
  },

  loginBtnDisabled: {
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background: "#64748b",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "900",
    cursor: "not-allowed",
  },

  registerDark: {
    color: "#cbd5e1",
    marginTop: "22px",
    fontSize: "14px",
  },

  registerLight: {
    color: "#475569",
    marginTop: "22px",
    fontSize: "14px",
  },

  link: {
    color: "#06b6d4",
    textDecoration: "none",
    fontWeight: "900",
  },
};

export default Login;