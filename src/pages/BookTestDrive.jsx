import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bikes, brands, categories } from "../data/bikes";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import Button from "../components/Button";
import "../styles/globals.css";

const BookTestDrive = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, updateUser } = useAuth();
    const { showToast } = useNotification();

    // Auto-select bike if coming from details page
    const preSelectedBikeId = location.state?.bikeId || "";

    const [formData, setFormData] = useState({
        name: "",
        bikeId: preSelectedBikeId,
        date: "",
        time: "",
        phone: "",
    });

    // Protect route and pre-fill data
    useEffect(() => {
        if (!currentUser) {
            // Check if any users exist in local storage to decide where to send them
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            if (users.length > 0) {
                navigate("/login");
            } else {
                navigate("/register");
            }
            return;
        }

        setFormData((prev) => ({
            ...prev,
            name: currentUser.name,
            // Email is implicitly currentUser.email
        }));
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.bikeId) {
            showToast("Please select a bike to test drive.", "error");
            return;
        }
        // Save booking to user profile
        const newBooking = {
            bikeId: formData.bikeId,
            date: formData.date,
            time: formData.time,
            id: Date.now(),
        };

        const currentBookings = currentUser.bookings || [];
        updateUser({ bookings: [...currentBookings, newBooking] });

        console.log("Booking submitted:", formData);
        showToast("Booking confirmed! Check your profile.", "success");
        navigate("/profile"); // Redirect to profile to see the booking
    };

    return (
        <div
            className="container"
            style={{ padding: "60px 20px", maxWidth: "600px" }}
        >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontFamily: "var(--font-display)",
                    }}
                >
                    Book a Test Drive
                </h1>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Experience the machine before you buy.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    backgroundColor: "var(--color-bg-elevated)",
                    padding: "30px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                }}
            >
                {/* Bike Selection */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>Select Model</label>
                    <select
                        name="bikeId"
                        value={formData.bikeId}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "var(--radius-md)",
                            backgroundColor: "var(--color-bg-primary)",
                            color: "#fff",
                            border: "1px solid var(--color-border)",
                        }}
                        required
                    >
                        <option value="">-- Choose a Bike --</option>
                        {brands.map((brand) => {
                            const brandBikes = bikes.filter(
                                (b) => b.brandId === brand.id
                            );
                            if (brandBikes.length === 0) return null;

                            return (
                                <optgroup
                                    key={brand.id}
                                    label={brand.name.toUpperCase()}
                                >
                                    {categories.map((cat) => {
                                        const catBikes = brandBikes.filter(
                                            (b) => b.categoryId === cat.id
                                        );
                                        if (catBikes.length === 0) return null;

                                        return (
                                            <React.Fragment key={cat.id}>
                                                <option
                                                    disabled
                                                    style={{
                                                        color: "var(--color-accent)",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    ─── {cat.name} ───
                                                </option>
                                                {catBikes.map((bike) => (
                                                    <option
                                                        key={bike.id}
                                                        value={bike.id}
                                                    >
                                                        &nbsp;&nbsp;{bike.name}
                                                    </option>
                                                ))}
                                            </React.Fragment>
                                        );
                                    })}
                                </optgroup>
                            );
                        })}
                    </select>
                </div>

                {/* Name */}
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
                        placeholder="John Doe"
                        required
                        style={{
                            padding: "12px",
                            borderRadius: "var(--radius-md)",
                            backgroundColor: "var(--color-bg-primary)",
                            color: "#fff",
                            border: "1px solid var(--color-border)",
                        }}
                    />
                </div>

                {/* Phone */}
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
                        style={{
                            padding: "12px",
                            borderRadius: "var(--radius-md)",
                            backgroundColor: "var(--color-bg-primary)",
                            color: "#fff",
                            border: "1px solid var(--color-border)",
                        }}
                    />
                </div>

                {/* Date */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>Preferred Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        style={{
                            padding: "12px",
                            borderRadius: "var(--radius-md)",
                            backgroundColor: "var(--color-bg-primary)",
                            color: "#fff",
                            border: "1px solid var(--color-border)",
                        }}
                    />
                </div>

                {/* Time */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>Preferred Time (09:00 - 21:00)</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        min="09:00"
                        max="21:00"
                        style={{
                            padding: "12px",
                            borderRadius: "var(--radius-md)",
                            backgroundColor: "var(--color-bg-primary)",
                            color: "#fff",
                            border: "1px solid var(--color-border)",
                        }}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    style={{ marginTop: "10px" }}
                >
                    Confirm Booking
                </Button>
            </form>
        </div>
    );
};

export default BookTestDrive;
