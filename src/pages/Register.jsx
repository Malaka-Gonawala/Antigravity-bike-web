import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import "../styles/globals.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();
    const { showToast } = useNotification();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(name, email, password);
        if (result.success) {
            showToast("Account created successfully! Please login.", "success");
            navigate("/login");
        } else {
            showToast(result.message, "error");
        }
    };

    return (
        <div
            className="container"
            style={{
                padding: "80px 20px",
                maxWidth: "450px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "var(--color-bg-elevated)",
                    padding: "40px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        marginBottom: "30px",
                        textAlign: "center",
                    }}
                >
                    Create Account
                </h1>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                padding: "12px",
                                borderRadius: "var(--radius-md)",
                                backgroundColor: "var(--color-bg-primary)",
                                color: "#fff",
                                border: "1px solid var(--color-border)",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: "12px",
                                borderRadius: "var(--radius-md)",
                                backgroundColor: "var(--color-bg-primary)",
                                color: "#fff",
                                border: "1px solid var(--color-border)",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            maxLength={16}
                            style={{
                                padding: "12px",
                                borderRadius: "var(--radius-md)",
                                backgroundColor: "var(--color-bg-primary)",
                                color: "#fff",
                                border: "1px solid var(--color-border)",
                            }}
                        />
                    </div>
                    <Button type="submit" variant="primary" fullWidth size="lg">
                        Register
                    </Button>
                </form>
                <p
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        color: "var(--color-text-secondary)",
                    }}
                >
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "var(--color-accent)" }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
