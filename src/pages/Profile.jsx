import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";
import { bikes } from "../data/bikes";
import BikeCard from "../components/BikeCard";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import {
    User,
    Calendar,
    Heart,
    Trash2,
    LogOut,
    Briefcase,
    Settings,
    LayoutGrid,
    Sun,
    Moon,
} from "lucide-react";
import "../styles/globals.css";

const Profile = () => {
    const { currentUser, logout, deleteAccount, updateUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { showToast } = useNotification();
    const navigate = useNavigate();

    // Tab State
    const [activeTab, setActiveTab] = useState("dashboard");

    // Edit State
    const [name, setName] = useState(currentUser?.name || "");
    const [avatar, setAvatar] = useState(currentUser?.avatar || "");
    const [newPassword, setNewPassword] = useState("");

    // Booking Cancellation State
    const [cancellingBooking, setCancellingBooking] = useState(null);

    // Account Deletion State
    const [isDeleting, setIsDeleting] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        } else {
            setName(currentUser.name);
            setAvatar(currentUser.avatar || "");
        }
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    // Data Resolution
    const watchlistIds = currentUser.watchlist || [];
    const watchlistBikes = bikes.filter((b) => watchlistIds.includes(b.id));
    const bookings = currentUser.bookings || [];
    const applications = currentUser.applications || [];

    // Handlers
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const updates = {};
        if (name && name !== currentUser.name) updates.name = name;
        if (avatar !== currentUser.avatar) updates.avatar = avatar;
        if (newPassword) {
            if (newPassword.length < 8 || newPassword.length > 16) {
                showToast("Password must be 8-16 characters", "error");
                return;
            }
            updates.password = newPassword;
        }

        if (Object.keys(updates).length > 0) {
            await updateUser(updates);
            showToast("Profile updated successfully!", "success");
            setNewPassword("");
        }
    };

    const handleDeleteAccount = () => setIsDeleting(true);

    const confirmDelete = async () => {
        const result = await deleteAccount(passwordInput);
        if (result.success) {
            showToast("Account deleted successfully.", "info");
            navigate("/");
        } else {
            showToast(result.message || "Incorrect password.", "error");
            setIsDeleting(false);
            setPasswordInput("");
        }
    };

    const renderApplicationCard = (app, idx) => (
        <div key={idx} className="application-card">
            <div
                style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginBottom: "5px",
                    color: "var(--color-accent)",
                }}
            >
                {app.jobTitle}
            </div>
            <div
                style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    marginBottom: "12px",
                }}
            >
                Applied on {app.date}
            </div>
            <div
                style={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    padding: "4px 10px",
                    backgroundColor:
                        app.status === "Accepted"
                            ? "rgba(34, 197, 94, 0.1)"
                            : app.status === "Rejected"
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgba(59, 130, 246, 0.1)",
                    color:
                        app.status === "Accepted"
                            ? "#22c55e"
                            : app.status === "Rejected"
                            ? "#ef4444"
                            : "#3b82f6",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                }}
            >
                {app.status.toUpperCase()}
            </div>

            <div className="detail-section">
                <div className="detail-item">
                    <div className="detail-label">Contact</div>
                    <div className="detail-value">
                        {app.email} • {app.phone}
                    </div>
                </div>
                {(app.linkedin || app.portfolio) && (
                    <div className="detail-item">
                        <div className="detail-label">Links</div>
                        <div
                            className="detail-value"
                            style={{ display: "flex", gap: "10px" }}
                        >
                            {app.linkedin && (
                                <a
                                    href={app.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "var(--color-accent)" }}
                                >
                                    LinkedIn
                                </a>
                            )}
                            {app.portfolio && (
                                <a
                                    href={app.portfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "var(--color-accent)" }}
                                >
                                    Portfolio
                                </a>
                            )}
                        </div>
                    </div>
                )}
                <div className="detail-item">
                    <div className="detail-label">Cover Letter</div>
                    <div
                        className="detail-value"
                        style={{ fontSize: "0.85rem", fontStyle: "italic" }}
                    >
                        "{app.coverLetter}"
                    </div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Status</div>
                    <div
                        className="detail-value"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        {app.status === "Pending" && "Under review by HR team."}
                        {app.status === "Accepted" && (
                            <span style={{ color: "#22c55e" }}>
                                Congratulations! You have been accepted. Check
                                your email for onboarding details. <br />
                                <span
                                    style={{
                                        fontSize: "0.8em",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    (Decision on {app.decisionDate})
                                </span>
                            </span>
                        )}
                        {app.status === "Rejected" && (
                            <span style={{ color: "#ef4444" }}>
                                Thank you for your interest. We have decided to
                                move forward with other candidates. <br />
                                <span
                                    style={{
                                        fontSize: "0.8em",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    (Decision on {app.decisionDate})
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container" style={{ padding: "60px 20px" }}>
            <style>
                {`
                .application-card, .booking-card {
                    background-color: var(--color-bg-primary);
                    padding: 20px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                .application-card { max-height: 140px; }
                .booking-card { max-height: 120px; }
                .application-card:hover, .booking-card:hover {
                    max-height: 1000px;
                    transform: translateY(-5px);
                    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
                    border-color: var(--color-accent);
                    background-color: var(--color-bg-elevated);
                }
                .detail-section {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s ease 0.1s;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid var(--color-border);
                }
                .application-card:hover .detail-section,
                .booking-card:hover .detail-section {
                    opacity: 1;
                    transform: translateY(0);
                }
                .detail-item { margin-bottom: 16px; }
                .detail-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--color-accent);
                    margin-bottom: 4px;
                    font-weight: bold;
                }
                .detail-value { font-size: 0.95rem; color: var(--color-text-primary); }
                .bike-preview-img {
                    width: 100%;
                    height: 180px;
                    object-fit: contain;
                    border-radius: var(--radius-md);
                    margin-bottom: 15px;
                    background-color: var(--color-bg-primary);
                    padding: 10px;
                }
                `}
            </style>

            <div
                style={{
                    backgroundColor: "var(--color-bg-elevated)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    overflow: "hidden",
                    minHeight: "800px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "40px",
                        borderBottom: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "20px",
                        backgroundColor: "rgba(0,0,0,0.05)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                backgroundColor: "var(--color-bg-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid var(--color-accent)",
                                overflow: "hidden",
                            }}
                        >
                            {currentUser.avatar ? (
                                <img
                                    src={currentUser.avatar}
                                    alt="Profile"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <User size={40} color="var(--color-accent)" />
                            )}
                        </div>
                        <div>
                            <h1
                                style={{
                                    marginBottom: "5px",
                                    fontSize: "2rem",
                                }}
                            >
                                {currentUser.name}
                            </h1>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                {currentUser.email}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </Button>
                </div>

                {/* Navigation */}
                <div
                    style={{
                        display: "flex",
                        borderBottom: "1px solid var(--color-border)",
                        overflowX: "auto",
                        gap: "10px",
                        scrollbarWidth: "none",
                    }}
                >
                    {[
                        {
                            id: "dashboard",
                            icon: LayoutGrid,
                            label: "Dashboard",
                        },
                        {
                            id: "test-drives",
                            icon: Calendar,
                            label: "Test Drives",
                        },
                        { id: "watchlist", icon: Heart, label: "Watchlist" },
                        {
                            id: "applications",
                            icon: Briefcase,
                            label: "Applications",
                        },
                        { id: "settings", icon: Settings, label: "Settings" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                padding: "20px",
                                backgroundColor:
                                    activeTab === tab.id
                                        ? "var(--color-bg-primary)"
                                        : "transparent",
                                color:
                                    activeTab === tab.id
                                        ? "var(--color-accent)"
                                        : "var(--color-text-secondary)",
                                border: "none",
                                borderBottom:
                                    activeTab === tab.id
                                        ? "2px solid var(--color-accent)"
                                        : "2px solid transparent",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                transition: "all 0.2s",
                            }}
                        >
                            <tab.icon size={20} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div
                    style={{
                        padding: "40px",
                        flex: 1,
                        backgroundColor: "var(--color-bg-secondary)",
                    }}
                >
                    {/* DASHBOARD TAB */}
                    {activeTab === "dashboard" && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "60px",
                            }}
                        >
                            {/* Dashboard: Test Drives */}
                            <section>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <h2 style={{ fontSize: "1.5rem" }}>
                                        Recent Test Drives
                                    </h2>
                                    {bookings.length > 3 && (
                                        <button
                                            onClick={() =>
                                                setActiveTab("test-drives")
                                            }
                                            style={{
                                                color: "var(--color-accent)",
                                                fontSize: "0.9rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            View All
                                        </button>
                                    )}
                                </div>
                                {bookings.length > 0 ? (
                                    <div
                                        style={{
                                            display: "grid",
                                            gap: "20px",
                                            gridTemplateColumns:
                                                "repeat(auto-fill, minmax(280px, 1fr))",
                                        }}
                                    >
                                        {bookings
                                            .slice(0, 3)
                                            .map((booking, idx) => {
                                                const bike = bikes.find(
                                                    (b) =>
                                                        b.id === booking.bikeId
                                                );
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="booking-card"
                                                    >
                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                                fontSize:
                                                                    "1.2rem",
                                                                marginBottom:
                                                                    "5px",
                                                                color: "var(--color-accent)",
                                                            }}
                                                        >
                                                            {bike
                                                                ? bike.name
                                                                : "Unknown Bike"}
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "var(--color-text-secondary)",
                                                                fontSize:
                                                                    "0.9rem",
                                                                marginBottom:
                                                                    "10px",
                                                            }}
                                                        >
                                                            {booking.date} at{" "}
                                                            {booking.time}
                                                        </div>
                                                        <div
                                                            style={{
                                                                alignSelf:
                                                                    "flex-start",
                                                                padding:
                                                                    "4px 10px",
                                                                backgroundColor:
                                                                    "rgba(34, 197, 94, 0.1)",
                                                                color: "#22c55e",
                                                                borderRadius:
                                                                    "var(--radius-sm)",
                                                                fontSize:
                                                                    "0.75rem",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            CONFIRMED
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        No upcoming test drives.
                                    </p>
                                )}
                            </section>

                            {/* Dashboard: Watchlist */}
                            <section>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <h2 style={{ fontSize: "1.5rem" }}>
                                        Watchlist Preview
                                    </h2>
                                    {watchlistBikes.length > 4 && (
                                        <button
                                            onClick={() =>
                                                setActiveTab("watchlist")
                                            }
                                            style={{
                                                color: "var(--color-accent)",
                                                fontSize: "0.9rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            View All
                                        </button>
                                    )}
                                </div>
                                {watchlistBikes.length > 0 ? (
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fill, minmax(250px, 1fr))",
                                            gap: "20px",
                                        }}
                                    >
                                        {watchlistBikes
                                            .slice(0, 4)
                                            .map((bike) => (
                                                <BikeCard
                                                    key={bike.id}
                                                    bike={bike}
                                                />
                                            ))}
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        Your watchlist is empty.
                                    </p>
                                )}
                            </section>

                            {/* Dashboard: Applications */}
                            <section>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <h2 style={{ fontSize: "1.5rem" }}>
                                        Recent Applications
                                    </h2>
                                    {applications.length > 3 && (
                                        <button
                                            onClick={() =>
                                                setActiveTab("applications")
                                            }
                                            style={{
                                                color: "var(--color-accent)",
                                                fontSize: "0.9rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            View All
                                        </button>
                                    )}
                                </div>
                                {applications.length > 0 ? (
                                    <div
                                        style={{
                                            display: "grid",
                                            gap: "20px",
                                            gridTemplateColumns:
                                                "repeat(auto-fill, minmax(320px, 1fr))",
                                        }}
                                    >
                                        {applications
                                            .slice(0, 3)
                                            .map((app, idx) =>
                                                renderApplicationCard(app, idx)
                                            )}
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        No active job applications.
                                    </p>
                                )}
                            </section>
                        </div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === "settings" && (
                        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                            <h2
                                style={{
                                    marginBottom: "30px",
                                    borderBottom:
                                        "1px solid var(--color-border)",
                                    paddingBottom: "10px",
                                }}
                            >
                                Settings
                            </h2>

                            {/* Theme Toggle */}
                            <div style={{ marginBottom: "40px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "15px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Appearance
                                </label>
                                <Button
                                    onClick={toggleTheme}
                                    variant="outline"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        width: "100%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        {theme === "dark" ? (
                                            <Moon size={18} />
                                        ) : (
                                            <Sun size={18} />
                                        )}
                                        {theme === "dark"
                                            ? "Dark Mode"
                                            : "Light Mode"}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "0.8rem",
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        Click to switch
                                    </span>
                                </Button>
                            </div>

                            {/* Edit Profile Form */}
                            <h3 style={{ marginBottom: "20px" }}>
                                Profile Details
                            </h3>

                            <form
                                onSubmit={handleUpdateProfile}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    marginBottom: "60px",
                                }}
                            >
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            border: "1px solid var(--color-border)",
                                            color: "var(--color-text-primary)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Profile Picture URL
                                    </label>
                                    <input
                                        type="text"
                                        value={avatar}
                                        onChange={(e) =>
                                            setAvatar(e.target.value)
                                        }
                                        placeholder="https://example.com/photo.jpg"
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            border: "1px solid var(--color-border)",
                                            color: "var(--color-text-primary)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        minLength={8}
                                        maxLength={16}
                                        placeholder="Min 8 characters"
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            border: "1px solid var(--color-border)",
                                            color: "var(--color-text-primary)",
                                        }}
                                    />
                                </div>
                                <Button variant="primary" type="submit">
                                    Update Profile
                                </Button>
                            </form>

                            {/* Danger Zone */}
                            <div
                                style={{
                                    borderTop: "1px solid var(--color-border)",
                                    paddingTop: "40px",
                                }}
                            >
                                <h3
                                    style={{
                                        color: "#ef4444",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Danger Zone
                                </h3>
                                <p
                                    style={{
                                        color: "var(--color-text-secondary)",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Once you delete your account, there is no
                                    going back.
                                </p>
                                {!isDeleting ? (
                                    <Button
                                        variant="primary"
                                        onClick={handleDeleteAccount}
                                        style={{
                                            backgroundColor: "#ef4444",
                                            borderColor: "#ef4444",
                                        }}
                                    >
                                        <Trash2 size={16} /> Delete Account
                                    </Button>
                                ) : (
                                    <div style={{ maxWidth: "400px" }}>
                                        <p
                                            style={{
                                                marginBottom: "10px",
                                                color: "var(--color-text-primary)",
                                            }}
                                        >
                                            Enter password to confirm:
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <input
                                                type="password"
                                                value={passwordInput}
                                                onChange={(e) =>
                                                    setPasswordInput(
                                                        e.target.value
                                                    )
                                                }
                                                minLength={8}
                                                maxLength={16}
                                                placeholder="Password"
                                                style={{
                                                    padding: "10px",
                                                    borderRadius:
                                                        "var(--radius-md)",
                                                    border: "1px solid var(--color-border)",
                                                    backgroundColor:
                                                        "var(--color-bg-primary)",
                                                    color: "var(--color-text-primary)",
                                                    flex: 1,
                                                }}
                                            />
                                            <Button
                                                variant="primary"
                                                onClick={confirmDelete}
                                                style={{
                                                    backgroundColor: "#ef4444",
                                                    borderColor: "#ef4444",
                                                }}
                                            >
                                                Confirm
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsDeleting(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TEST DRIVES TAB */}
                    {activeTab === "test-drives" && (
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>
                                My Test Drives
                            </h2>
                            {bookings.length > 0 ? (
                                <div
                                    style={{
                                        display: "grid",
                                        gap: "20px",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(280px, 1fr))",
                                    }}
                                >
                                    {bookings.map((booking, idx) => {
                                        const bike = bikes.find(
                                            (b) => b.id === booking.bikeId
                                        );
                                        return (
                                            <div
                                                key={idx}
                                                className="booking-card"
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.2rem",
                                                        marginBottom: "5px",
                                                        color: "var(--color-accent)",
                                                    }}
                                                >
                                                    {bike
                                                        ? bike.name
                                                        : "Unknown Bike"}
                                                </div>
                                                <div
                                                    style={{
                                                        color: "var(--color-text-secondary)",
                                                        fontSize: "0.9rem",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {booking.date} at{" "}
                                                    {booking.time}
                                                </div>
                                                <div
                                                    style={{
                                                        alignSelf: "flex-start",
                                                        padding: "4px 10px",
                                                        backgroundColor:
                                                            "rgba(34, 197, 94, 0.1)",
                                                        color: "#22c55e",
                                                        borderRadius:
                                                            "var(--radius-sm)",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    CONFIRMED
                                                </div>
                                                <div className="detail-section">
                                                    {bike && (
                                                        <>
                                                            <img
                                                                src={
                                                                    bike.image.startsWith(
                                                                        "/"
                                                                    )
                                                                        ? import.meta
                                                                              .env
                                                                              .BASE_URL +
                                                                          bike.image.slice(
                                                                              1
                                                                          )
                                                                        : bike.image
                                                                }
                                                                alt={bike.name}
                                                                className="bike-preview-img"
                                                            />
                                                            <div className="detail-item">
                                                                <div className="detail-label">
                                                                    Brand
                                                                </div>
                                                                <div className="detail-value">
                                                                    {bike.brandId.toUpperCase()}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className="detail-item">
                                                        <div className="detail-label">
                                                            Booking ID
                                                        </div>
                                                        <div className="detail-value">
                                                            #{booking.id}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            setCancellingBooking(
                                                                booking
                                                            )
                                                        }
                                                        style={{
                                                            color: "#ef4444",
                                                            textDecoration:
                                                                "underline",
                                                            marginTop: "10px",
                                                            border: "none",
                                                            background: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p
                                    style={{
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    No bookings found.
                                </p>
                            )}
                            {/* Cancellation Modal */}
                            {cancellingBooking && (
                                <div
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgba(0,0,0,0.8)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 1000,
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor:
                                                "var(--color-bg-elevated)",
                                            padding: "40px",
                                            borderRadius: "var(--radius-lg)",
                                            maxWidth: "450px",
                                            width: "90%",
                                            border: "1px solid var(--color-border)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: "1.5rem",
                                                marginBottom: "15px",
                                            }}
                                        >
                                            Cancel Test Drive?
                                        </h3>
                                        <p
                                            style={{
                                                color: "var(--color-text-secondary)",
                                                marginBottom: "30px",
                                            }}
                                        >
                                            Are you sure?
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "15px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    const updatedBookings =
                                                        bookings.filter(
                                                            (b) =>
                                                                b.id !==
                                                                cancellingBooking.id
                                                        );
                                                    updateUser({
                                                        bookings:
                                                            updatedBookings,
                                                    });
                                                    setCancellingBooking(null);
                                                }}
                                                style={{
                                                    backgroundColor: "#ef4444",
                                                    borderColor: "#ef4444",
                                                }}
                                            >
                                                Yes, Cancel
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setCancellingBooking(null)
                                                }
                                            >
                                                No, Keep it
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* WATCHLIST TAB */}
                    {activeTab === "watchlist" && (
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>
                                My Watchlist
                            </h2>
                            {watchlistBikes.length > 0 ? (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(300px, 1fr))",
                                        gap: "30px",
                                    }}
                                >
                                    {watchlistBikes.map((bike) => (
                                        <BikeCard key={bike.id} bike={bike} />
                                    ))}
                                </div>
                            ) : (
                                <p
                                    style={{
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    Your watchlist is empty.{" "}
                                    <Link
                                        to="/catalog"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        Explore Models
                                    </Link>
                                </p>
                            )}
                        </div>
                    )}

                    {/* APPLICATIONS TAB */}
                    {activeTab === "applications" && (
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>
                                My Job Applications
                            </h2>
                            {applications.length > 0 ? (
                                <div
                                    style={{
                                        display: "grid",
                                        gap: "20px",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(320px, 1fr))",
                                    }}
                                >
                                    {applications.map((app, idx) =>
                                        renderApplicationCard(app, idx)
                                    )}
                                </div>
                            ) : (
                                <p
                                    style={{
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    No applications found.{" "}
                                    <Link
                                        to="/careers"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        View Careers
                                    </Link>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
