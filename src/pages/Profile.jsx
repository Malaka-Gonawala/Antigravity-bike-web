import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { bikes } from "../data/bikes";
import BikeCard from "../components/BikeCard";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import { User, Calendar, Heart, Trash2, LogOut, Briefcase } from "lucide-react";
import "../styles/globals.css";

const Profile = () => {
    const { currentUser, logout, deleteAccount, updateUser } = useAuth();
    const navigate = useNavigate();

    // Tab State
    const [activeTab, setActiveTab] = React.useState("credentials");

    // Edit State
    const [name, setName] = React.useState(currentUser?.name || "");
    const [avatar, setAvatar] = React.useState(currentUser?.avatar || "");
    const [newPassword, setNewPassword] = React.useState("");

    const [successMsg, setSuccessMsg] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        } else {
            setName(currentUser.name);
            setAvatar(currentUser.avatar || "");
        }
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    // Resolve watchlist bikes
    const watchlistIds = currentUser.watchlist || [];
    const watchlistBikes = bikes.filter((b) => watchlistIds.includes(b.id));

    // Bookings
    const bookings = currentUser.bookings || [];

    // Applications
    const applications = currentUser.applications || [];

    const [isDeleting, setIsDeleting] = React.useState(false);
    const [passwordInput, setPasswordInput] = React.useState("");

    // Test Drive Cancellation State
    const [cancellingBooking, setCancellingBooking] = React.useState(null);

    const handleDeleteAccount = () => {
        setIsDeleting(true);
    };

    const confirmDelete = () => {
        if (passwordInput === currentUser.password) {
            deleteAccount();
            navigate("/");
        } else {
            setErrorMsg("Incorrect password. Account deletion cancelled.");
            setTimeout(() => setErrorMsg(""), 3000);
            setIsDeleting(false);
            setPasswordInput("");
        }
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setErrorMsg("");
        const updates = {};
        if (name && name !== currentUser.name) updates.name = name;
        if (avatar !== currentUser.avatar) updates.avatar = avatar;
        if (newPassword) {
            if (newPassword.length < 8 || newPassword.length > 16) {
                setErrorMsg("Password must be 8-16 characters");
                return;
            }
            updates.password = newPassword;
        }

        if (Object.keys(updates).length > 0) {
            updateUser(updates);
            setSuccessMsg("Profile updated successfully!");
            setNewPassword("");
            setTimeout(() => setSuccessMsg(""), 3000);
        }
    };

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
                .application-card {
                    max-height: 140px;
                }
                .booking-card {
                    max-height: 120px;
                }
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
                .detail-value { font-size: 0.95rem; color: #fff; }
                .detail-link {
                    color: var(--color-accent);
                    text-decoration: none;
                    transition: opacity 0.2s;
                }
                .detail-link:hover {
                    opacity: 0.8;
                    text-decoration: underline;
                }
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
                    minHeight: "600px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header (UserInfo) */}
                <div
                    style={{
                        padding: "40px",
                        borderBottom: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "20px",
                        backgroundColor: "rgba(0,0,0,0.2)",
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

                {/* Tabs Navigation */}
                <div
                    style={{
                        display: "flex",
                        borderBottom: "1px solid var(--color-border)",
                        overflowX: "auto",
                        gap: "10px",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {[
                        { id: "credentials", icon: User, label: "Credentials" },
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
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                padding: "20px",
                                backgroundColor:
                                    activeTab === tab.id
                                        ? "var(--color-bg-elevated)"
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

                {/* Tab Content */}
                <div style={{ padding: "40px", flex: 1 }}>
                    {/* Credentials Tab */}
                    {activeTab === "credentials" && (
                        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                            <h2
                                style={{
                                    marginBottom: "30px",
                                    borderBottom:
                                        "1px solid var(--color-border)",
                                    paddingBottom: "10px",
                                }}
                            >
                                Edit Profile
                            </h2>

                            {successMsg && (
                                <div
                                    style={{
                                        padding: "15px",
                                        backgroundColor:
                                            "rgba(34, 197, 94, 0.1)",
                                        color: "#22c55e",
                                        borderRadius: "var(--radius-md)",
                                        marginBottom: "20px",
                                        border: "1px solid rgba(34, 197, 94, 0.2)",
                                    }}
                                >
                                    {successMsg}
                                </div>
                            )}

                            {errorMsg && (
                                <div
                                    style={{
                                        padding: "15px",
                                        backgroundColor:
                                            "rgba(239, 68, 68, 0.1)",
                                        color: "#ef4444",
                                        borderRadius: "var(--radius-md)",
                                        marginBottom: "20px",
                                        border: "1px solid rgba(239, 68, 68, 0.2)",
                                    }}
                                >
                                    {errorMsg}
                                </div>
                            )}

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
                                            color: "#fff",
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
                                        placeholder="https://example.com/my-photo.jpg"
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            border: "1px solid var(--color-border)",
                                            color: "#fff",
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
                                        New Password (leave empty to keep
                                        current)
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="Min 8 characters"
                                        minLength={8}
                                        maxLength={16}
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            border: "1px solid var(--color-border)",
                                            color: "#fff",
                                        }}
                                    />
                                </div>
                                <Button variant="primary" type="submit">
                                    Update Profile
                                </Button>
                            </form>

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
                                    going back. Please be certain.
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
                                            Please enter your password to
                                            confirm deletion:
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
                                                placeholder="Enter password"
                                                style={{
                                                    padding: "10px",
                                                    borderRadius:
                                                        "var(--radius-md)",
                                                    border: "1px solid var(--color-border)",
                                                    backgroundColor:
                                                        "var(--color-bg-primary)",
                                                    color: "#fff",
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

                    {/* Test Drives Tab */}
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
                                                        letterSpacing: "0.05em",
                                                    }}
                                                >
                                                    CONFIRMED
                                                </div>

                                                <div className="detail-section">
                                                    {bike && (
                                                        <>
                                                            <img
                                                                src={bike.image}
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
                                                            <div className="detail-item">
                                                                <div className="detail-label">
                                                                    Category
                                                                </div>
                                                                <div className="detail-value">
                                                                    {bike.categoryId.toUpperCase()}
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
                                                    <div
                                                        className="detail-item"
                                                        style={{
                                                            marginTop: "10px",
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                setCancellingBooking(
                                                                    booking
                                                                )
                                                            }
                                                            style={{
                                                                background:
                                                                    "transparent",
                                                                border: "none",
                                                                color: "#ef4444",
                                                                fontSize:
                                                                    "0.85rem",
                                                                cursor: "pointer",
                                                                textDecoration:
                                                                    "underline",
                                                                padding: 0,
                                                            }}
                                                        >
                                                            Cancel Booking
                                                        </button>
                                                    </div>
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
                                    No test drives booked yet.{" "}
                                    <Link
                                        to="/catalog"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        Browse bikes
                                    </Link>
                                </p>
                            )}

                            {/* Booking Cancellation Confirmation Modal */}
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
                                            Are you sure you want to cancel your
                                            test drive for the{" "}
                                            <strong>
                                                {
                                                    bikes.find(
                                                        (b) =>
                                                            b.id ===
                                                            cancellingBooking.bikeId
                                                    )?.name
                                                }
                                            </strong>{" "}
                                            on {cancellingBooking.date}?
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

                    {/* Watchlist Tab */}
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

                    {/* Applications Tab */}
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
                                        alignItems: "start",
                                    }}
                                >
                                    {applications.map((app, idx) => (
                                        <div
                                            key={idx}
                                            className="application-card"
                                        >
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
                                                        app.status ===
                                                        "Accepted"
                                                            ? "rgba(34, 197, 94, 0.1)"
                                                            : app.status ===
                                                              "Rejected"
                                                            ? "rgba(239, 68, 68, 0.1)"
                                                            : "rgba(59, 130, 246, 0.1)",
                                                    color:
                                                        app.status ===
                                                        "Accepted"
                                                            ? "#22c55e"
                                                            : app.status ===
                                                              "Rejected"
                                                            ? "#ef4444"
                                                            : "#3b82f6",
                                                    borderRadius:
                                                        "var(--radius-sm)",
                                                    fontSize: "0.75rem",
                                                    fontWeight: "bold",
                                                    letterSpacing: "0.05em",
                                                }}
                                            >
                                                {app.status.toUpperCase()}
                                            </div>

                                            <div className="detail-section">
                                                {app.status === "Accepted" && (
                                                    <div
                                                        style={{
                                                            padding: "15px",
                                                            backgroundColor:
                                                                "rgba(34, 197, 94, 0.05)",
                                                            borderRadius:
                                                                "var(--radius-md)",
                                                            border: "1px solid rgba(34, 197, 94, 0.2)",
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                color: "#22c55e",
                                                                fontWeight:
                                                                    "bold",
                                                                fontSize:
                                                                    "0.95rem",
                                                                marginBottom:
                                                                    "5px",
                                                            }}
                                                        >
                                                            🎉 Congratulations!
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "var(--color-text-secondary)",
                                                                fontSize:
                                                                    "0.85rem",
                                                                lineHeight:
                                                                    "1.4",
                                                            }}
                                                        >
                                                            Your application has
                                                            been accepted. Our
                                                            team will contact
                                                            you via email within
                                                            24 hours to schedule
                                                            your first
                                                            interview.
                                                        </div>
                                                    </div>
                                                )}

                                                {app.status === "Rejected" && (
                                                    <div
                                                        style={{
                                                            padding: "15px",
                                                            backgroundColor:
                                                                "rgba(239, 68, 68, 0.05)",
                                                            borderRadius:
                                                                "var(--radius-md)",
                                                            border: "1px solid rgba(239, 68, 68, 0.2)",
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                color: "#ef4444",
                                                                fontWeight:
                                                                    "bold",
                                                                fontSize:
                                                                    "0.95rem",
                                                                marginBottom:
                                                                    "5px",
                                                            }}
                                                        >
                                                            Update on Your
                                                            Application
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "var(--color-text-secondary)",
                                                                fontSize:
                                                                    "0.85rem",
                                                                lineHeight:
                                                                    "1.4",
                                                            }}
                                                        >
                                                            Thank you for your
                                                            interest in
                                                            Antigravity. After
                                                            careful review, we
                                                            have decided to move
                                                            forward with other
                                                            candidates at this
                                                            time. We wish you
                                                            the best in your
                                                            search!
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="detail-item">
                                                    <div className="detail-label">
                                                        Phone Number
                                                    </div>
                                                    <div className="detail-value">
                                                        {app.phone}
                                                    </div>
                                                </div>
                                                <div className="detail-item">
                                                    <div className="detail-label">
                                                        LinkedIn Profile
                                                    </div>
                                                    <div className="detail-value">
                                                        <a
                                                            href={app.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="detail-link"
                                                        >
                                                            View Profile
                                                        </a>
                                                    </div>
                                                </div>
                                                {app.portfolio && (
                                                    <div className="detail-item">
                                                        <div className="detail-label">
                                                            Portfolio
                                                        </div>
                                                        <div className="detail-value">
                                                            <a
                                                                href={
                                                                    app.portfolio
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="detail-link"
                                                            >
                                                                View Work
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                                <div
                                                    className="detail-item"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <div className="detail-label">
                                                        Cover Letter / Message
                                                    </div>
                                                    <div
                                                        className="detail-value"
                                                        style={{
                                                            lineHeight: "1.6",
                                                            fontSize: "0.9rem",
                                                            color: "var(--color-text-secondary)",
                                                            whiteSpace:
                                                                "pre-wrap",
                                                        }}
                                                    >
                                                        {app.coverLetter}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p
                                    style={{
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    No applications submitted yet.{" "}
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
