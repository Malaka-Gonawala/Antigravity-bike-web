import React from "react";
import "../styles/globals.css";

const PrivacyPolicy = () => {
    return (
        <div className="container" style={{ padding: "80px 20px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1
                    className="slide-up"
                    style={{ fontSize: "2.5rem", marginBottom: "40px" }}
                >
                    PRIVACY{" "}
                    <span style={{ color: "var(--color-accent)" }}>POLICY</span>
                </h1>

                <div
                    className="fade-in delay-1"
                    style={{
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.8",
                    }}
                >
                    <p style={{ marginBottom: "20px" }}>
                        Last updated: December 26, 2025
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        1. Information We Collect
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        We collect information you provide directly to us when
                        you create an account, book a test drive, or communicate
                        with us. This may include your name, email address,
                        phone number, and motorcycle preferences.
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        2. How We Use Information
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        We use the information we collect to provide, maintain,
                        and improve our services, including processing your test
                        drive bookings and communicating important updates about
                        our inventory.
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        3. Data Security
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        We take reasonable measures to help protect information
                        about you from loss, theft, misuse, and unauthorized
                        access, disclosure, alteration, and destruction.
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        4. Contact Us
                    </h2>
                    <p>
                        If you have any questions about this Privacy Policy,
                        please contact us at privacy@antigravitybikes.com.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
