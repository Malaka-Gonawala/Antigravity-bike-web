import React from "react";
import "../styles/globals.css";

const About = () => {
    return (
        <div className="container" style={{ padding: "80px 20px" }}>
            <h1
                className="slide-up"
                style={{
                    fontSize: "3rem",
                    marginBottom: "40px",
                    textAlign: "center",
                }}
            >
                ABOUT <span style={{ color: "var(--color-accent)" }}>US</span>
            </h1>

            <div
                className="fade-in delay-1"
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    lineHeight: "1.8",
                    fontSize: "1.1rem",
                    color: "var(--color-text-secondary)",
                }}
            >
                <p style={{ marginBottom: "30px" }}>
                    Born from a passion for speed and a relentless pursuit of
                    engineering excellence, Antigravity Bikes was founded in
                    2020 with a single goal: to redefine what's possible on two
                    wheels.
                </p>

                <h2
                    style={{
                        color: "var(--color-text-primary)",
                        marginBottom: "20px",
                    }}
                >
                    Our Mission
                </h2>
                <p style={{ marginBottom: "30px" }}>
                    We believe that riding a motorcycle isn't just about getting
                    from point A to point B. It's about the feeling of
                    liberation, the connection between rider and machine, and
                    the thrill of defying expectations.
                </p>

                <h2
                    style={{
                        color: "var(--color-text-primary)",
                        marginBottom: "20px",
                    }}
                >
                    Precision Engineering
                </h2>
                <p style={{ marginBottom: "30px" }}>
                    Every bike in our catalog is hand-selected and verified by
                    our team of expert technicians. We partner with the world's
                    most innovative manufacturers to bring you bikes that aren't
                    just fast, they're future-proof.
                </p>

                <h2
                    style={{
                        color: "var(--color-text-primary)",
                        marginBottom: "20px",
                    }}
                >
                    Join the Movement
                </h2>
                <p>
                    Whether you're a seasoned racer or a newcomer to the
                    culture, Antigravity is your gateway to the ultimate riding
                    experience. Welcome to the future of motorcycles.
                </p>
            </div>
        </div>
    );
};

export default About;
