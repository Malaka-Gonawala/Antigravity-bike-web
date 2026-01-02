import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import Button from "../components/Button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "../styles/globals.css";

const Contact = () => {
    const { showToast } = useNotification();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showToast("Please fill in all required fields.", "error");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        // Mock submission - save to localStorage for demo
        const contactSubmissions =
            JSON.parse(localStorage.getItem("contactSubmissions")) || [];
        contactSubmissions.push({
            ...formData,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem(
            "contactSubmissions",
            JSON.stringify(contactSubmissions)
        );

        showToast(
            "Message sent successfully! We'll get back to you soon.",
            "success"
        );

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "General Inquiry",
            message: "",
        });
    };

    return (
        <div className="container" style={{ padding: "60px 20px" }}>
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontFamily: "var(--font-display)",
                        marginBottom: "10px",
                        textAlign: "center",
                    }}
                >
                    Contact Us
                </h1>
                <p
                    style={{
                        textAlign: "center",
                        color: "var(--color-text-secondary)",
                        marginBottom: "60px",
                        fontSize: "1.1rem",
                    }}
                >
                    Have a question? We'd love to hear from you.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "40px",
                    }}
                >
                    {/* Contact Form */}
                    <div
                        style={{
                            gridColumn: "span 2",
                            backgroundColor: "var(--color-bg-elevated)",
                            padding: "40px",
                            borderRadius: "var(--radius-lg)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.5rem",
                                marginBottom: "30px",
                            }}
                        >
                            Send us a Message
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Name{" "}
                                    <span
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--color-border)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "var(--color-text-primary)",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit, minmax(280px, 1fr))",
                                    gap: "20px",
                                }}
                            >
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        Email{" "}
                                        <span
                                            style={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            border: "1px solid var(--color-border)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            color: "var(--color-text-primary)",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        Phone (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "var(--radius-md)",
                                            border: "1px solid var(--color-border)",
                                            backgroundColor:
                                                "var(--color-bg-primary)",
                                            color: "var(--color-text-primary)",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Subject{" "}
                                    <span
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        *
                                    </span>
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--color-border)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    <option>General Inquiry</option>
                                    <option>Test Drive</option>
                                    <option>Support</option>
                                    <option>Sales</option>
                                    <option>Careers</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Message{" "}
                                    <span
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        *
                                    </span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    maxLength={500}
                                    rows={6}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--color-border)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "var(--color-text-primary)",
                                        resize: "vertical",
                                        fontFamily: "inherit",
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "var(--color-text-secondary)",
                                        marginTop: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {formData.message.length}/500 characters
                                </p>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                style={{ alignSelf: "flex-start" }}
                            >
                                <Send
                                    size={18}
                                    style={{ marginRight: "8px" }}
                                />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info Cards */}
                    <div
                        style={{
                            gridColumn: "span 1",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "var(--color-bg-elevated)",
                                padding: "30px",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    marginBottom: "10px",
                                }}
                            >
                                <Phone
                                    size={24}
                                    style={{ color: "var(--color-accent)" }}
                                />
                                <h3 style={{ fontSize: "1.1rem" }}>Phone</h3>
                            </div>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                +39 051 6413111
                            </p>
                        </div>

                        <div
                            style={{
                                backgroundColor: "var(--color-bg-elevated)",
                                padding: "30px",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    marginBottom: "10px",
                                }}
                            >
                                <Mail
                                    size={24}
                                    style={{ color: "var(--color-accent)" }}
                                />
                                <h3 style={{ fontSize: "1.1rem" }}>Email</h3>
                            </div>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                info@antigravitybikes.com
                            </p>
                        </div>

                        <div
                            style={{
                                backgroundColor: "var(--color-bg-elevated)",
                                padding: "30px",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    marginBottom: "10px",
                                }}
                            >
                                <MapPin
                                    size={24}
                                    style={{ color: "var(--color-accent)" }}
                                />
                                <h3 style={{ fontSize: "1.1rem" }}>Address</h3>
                            </div>
                            <p
                                style={{
                                    color: "var(--color-text-secondary)",
                                    lineHeight: 1.6,
                                }}
                            >
                                Via Cavalieri Ducati, 3<br />
                                40132 Bologna
                                <br />
                                Italy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
