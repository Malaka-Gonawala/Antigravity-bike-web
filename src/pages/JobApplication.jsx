import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import Button from "../components/Button";
import "../styles/globals.css";

const JobApplication = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, updateUser } = useAuth();
    const { showToast } = useNotification();

    const jobTitle = location.state?.jobTitle || "General Application";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        portfolio: "",
        coverLetter: "",
    });

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            name: currentUser.name,
            email: currentUser.email,
        }));
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApplication = {
            id: Date.now(),
            jobTitle: jobTitle,
            status: "Pending",
            date: new Date().toLocaleDateString(),
            ...formData,
        };

        const currentApplications = currentUser.applications || [];
        updateUser({ applications: [...currentApplications, newApplication] });

        showToast(
            `Application for ${jobTitle} submitted successfully!`,
            "success"
        );
        navigate("/profile");
    };

    return (
        <div
            className="container"
            style={{ padding: "60px 20px", maxWidth: "800px" }}
        >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontFamily: "var(--font-display)",
                    }}
                >
                    Apply for{" "}
                    <span style={{ color: "var(--color-accent)" }}>
                        {jobTitle}
                    </span>
                </h1>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tell us why you're the perfect fit for Antigravity.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="fade-in"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    backgroundColor: "var(--color-bg-elevated)",
                    padding: "40px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
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
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
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
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            minLength={10}
                            maxLength={10}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <label>LinkedIn Profile</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            required
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>Portfolio / Website (Optional)</label>
                    <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        style={inputStyle}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>Cover Letter / Message</label>
                    <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        required
                        placeholder="I'm excited to apply because..."
                        rows={6}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                </div>

                <div
                    style={{ marginTop: "10px", display: "flex", gap: "16px" }}
                >
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        style={{ flex: 2 }}
                    >
                        Submit Application
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        style={{ flex: 1 }}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

const inputStyle = {
    padding: "14px",
    borderRadius: "var(--radius-md)",
    backgroundColor: "var(--color-bg-primary)",
    color: "#fff",
    border: "1px solid var(--color-border)",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
};

export default JobApplication;
