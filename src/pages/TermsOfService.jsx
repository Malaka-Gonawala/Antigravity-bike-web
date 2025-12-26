import React from "react";
import "../styles/globals.css";

const TermsOfService = () => {
    return (
        <div className="container" style={{ padding: "80px 20px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1
                    className="slide-up"
                    style={{ fontSize: "2.5rem", marginBottom: "40px" }}
                >
                    TERMS OF{" "}
                    <span style={{ color: "var(--color-accent)" }}>
                        SERVICE
                    </span>
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
                        1. Acceptance of Terms
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        By accessing or using the Antigravity Bikes website, you
                        agree to be bound by these Terms of Service. If you do
                        not agree to all of these terms, do not use our website.
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        2. User Accounts
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        When you create an account with us, you must provide
                        information that is accurate, complete, and current at
                        all times. Failure to do so constitutes a breach of the
                        Terms.
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        3. Test Drive Bookings
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        All test drive bookings are subject to availability and
                        verification of a valid motorcycle license. Antigravity
                        Bikes reserves the right to cancel or reschedule
                        bookings at its discretion.
                    </p>

                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            marginBottom: "15px",
                            marginTop: "30px",
                        }}
                    >
                        4. Limitation of Liability
                    </h2>
                    <p>
                        Antigravity Bikes shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages
                        resulting from your use of the website or services.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
