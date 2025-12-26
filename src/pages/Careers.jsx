import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/globals.css";
import Button from "../components/Button";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const Careers = () => {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useAuth();
    const [revokingJob, setRevokingJob] = useState(null);
    const [revokeReason, setRevokeReason] = useState("");

    const openings = [
        {
            title: "Lead Mechanical Engineer",
            department: "R&D",
            location: "Bologna, Italy",
        },
        {
            title: "Senior Digital Architect",
            department: "Software",
            location: "Remote / Berlin",
        },
        {
            title: "Performance Test Rider",
            department: "Operations",
            location: "Cremona Circuit",
        },
        {
            title: "Brand Experience Designer",
            department: "Marketing",
            location: "London, UK",
        },
    ];

    const hasApplied = (jobTitle) => {
        return currentUser?.applications?.some(
            (app) => app.jobTitle === jobTitle
        );
    };

    const handleRevoke = (e) => {
        e.preventDefault();
        if (!currentUser || !revokingJob) return;

        const updatedApps = currentUser.applications.filter(
            (app) => app.jobTitle !== revokingJob.title
        );

        updateUser({ applications: updatedApps });
        setRevokingJob(null);
        setRevokeReason("");
        alert(`Application for ${revokingJob.title} has been revoked.`);
    };

    return (
        <div className="container" style={{ padding: "80px 20px" }}>
            <h1
                className="slide-up"
                style={{
                    fontSize: "3rem",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                JOIN THE{" "}
                <span style={{ color: "var(--color-accent)" }}>TEAM</span>
            </h1>
            <p
                className="fade-in delay-1"
                style={{
                    textAlign: "center",
                    maxWidth: "600px",
                    margin: "0 auto 60px",
                    color: "var(--color-text-secondary)",
                }}
            >
                We're always looking for visionaries, engineers, and rebels who
                want to push the boundaries of motorcycle technology.
            </p>

            <div
                className="fade-in delay-2"
                style={{ maxWidth: "1000px", margin: "0 auto" }}
            >
                <h2 style={{ marginBottom: "30px", fontSize: "1.8rem" }}>
                    Current Openings
                </h2>
                <div style={{ display: "grid", gap: "20px" }}>
                    {openings.map((job, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "24px",
                                backgroundColor: "var(--color-bg-elevated)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--color-border)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                transition: "border-color 0.2s",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.borderColor =
                                    "var(--color-accent)")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.borderColor =
                                    "var(--color-border)")
                            }
                        >
                            <div>
                                <h3 style={{ marginBottom: "8px" }}>
                                    {job.title}
                                </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "16px",
                                        color: "var(--color-text-secondary)",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    <span>{job.department}</span>
                                    <span>•</span>
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                {(() => {
                                    const app = currentUser?.applications?.find(
                                        (a) => a.jobTitle === job.title
                                    );
                                    if (!app) {
                                        return (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigate("/apply-job", {
                                                        state: {
                                                            jobTitle: job.title,
                                                        },
                                                    })
                                                }
                                            >
                                                Apply Now
                                            </Button>
                                        );
                                    }

                                    const isAccepted =
                                        app.status === "Accepted";
                                    const isRejected =
                                        app.status === "Rejected";

                                    return (
                                        <>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    color: isAccepted
                                                        ? "#22c55e"
                                                        : isRejected
                                                        ? "#ef4444"
                                                        : "#3b82f6",
                                                    fontSize: "0.9rem",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {isAccepted ? (
                                                    <CheckCircle size={18} />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: "8px",
                                                            height: "8px",
                                                            borderRadius: "50%",
                                                            backgroundColor:
                                                                isRejected
                                                                    ? "#ef4444"
                                                                    : "#3b82f6",
                                                        }}
                                                    />
                                                )}
                                                {app.status}
                                            </div>
                                            {app.status === "Pending" && (
                                                <button
                                                    onClick={() =>
                                                        setRevokingJob(job)
                                                    }
                                                    style={{
                                                        background:
                                                            "transparent",
                                                        border: "none",
                                                        color: "#ef4444",
                                                        fontSize: "0.85rem",
                                                        cursor: "pointer",
                                                        textDecoration:
                                                            "underline",
                                                        padding: "4px 8px",
                                                    }}
                                                >
                                                    Revoke
                                                </button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Revoke Confirmation Modal */}
            {revokingJob && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                        padding: "20px",
                    }}
                >
                    <div
                        className="fade-in"
                        style={{
                            backgroundColor: "var(--color-bg-elevated)",
                            padding: "40px",
                            borderRadius: "var(--radius-lg)",
                            border: "1px solid var(--color-border)",
                            maxWidth: "500px",
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        <button
                            onClick={() => setRevokingJob(null)}
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                background: "transparent",
                                border: "none",
                                color: "var(--color-text-secondary)",
                                cursor: "pointer",
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "30px",
                            }}
                        >
                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 20px",
                                }}
                            >
                                <AlertCircle size={32} color="#ef4444" />
                            </div>
                            <h2
                                style={{
                                    fontSize: "1.8rem",
                                    marginBottom: "10px",
                                }}
                            >
                                Revoke Application?
                            </h2>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                You are about to revoke your application for{" "}
                                <strong>{revokingJob.title}</strong>.
                            </p>
                        </div>

                        <form
                            onSubmit={handleRevoke}
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
                                <label style={{ fontSize: "0.9rem" }}>
                                    Reason for revoking (optional)
                                </label>
                                <textarea
                                    value={revokeReason}
                                    onChange={(e) =>
                                        setRevokeReason(e.target.value)
                                    }
                                    placeholder="e.g., I found another opportunity..."
                                    rows={3}
                                    style={{
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "#fff",
                                        border: "1px solid var(--color-border)",
                                        resize: "none",
                                        outline: "none",
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "16px" }}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#ef4444",
                                        borderColor: "#ef4444",
                                    }}
                                >
                                    Confirm Revoke
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    style={{ flex: 1 }}
                                    onClick={() => setRevokingJob(null)}
                                >
                                    Keep Application
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
