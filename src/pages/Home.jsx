import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import { bikes } from "../data/bikes";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import BikeCard from "../components/BikeCard";
import { ArrowRight, Zap, Shield, Trophy } from "lucide-react";

const Home = () => {
    // Rotating words for hero title
    const rotatingWords = [
        "LIMITS",
        "EXPECTATIONS",
        "BOUNDARIES",
        "CONVENTION",
        "THE ODDS",
        "GRAVITY",
    ];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const isLastWord = currentWordIndex === rotatingWords.length - 1;
        const displayDuration = isLastWord ? 5000 : 2000; // GRAVITY stays 5 seconds, others 2 seconds

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentWordIndex(
                    (prev) => (prev + 1) % rotatingWords.length
                );
                setFade(true);
            }, 500); // Fade out duration
        }, displayDuration);

        return () => clearInterval(interval);
    }, [currentWordIndex]);

    // Get 3 random bikes for "featured" - persists across refreshes in same session
    const getFeaturedBikes = () => {
        // Check if we already have featured bikes in this session
        const storedIds = sessionStorage.getItem("featuredBikeIds");

        if (storedIds) {
            // Use stored IDs from this session
            const ids = JSON.parse(storedIds);
            return bikes.filter((bike) => ids.includes(bike.id));
        } else {
            // Generate new random bikes
            const shuffled = [...bikes].sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, 3);
            const selectedIds = selected.map((bike) => bike.id);

            // Store for this session
            sessionStorage.setItem(
                "featuredBikeIds",
                JSON.stringify(selectedIds)
            );
            return selected;
        }
    };

    const featuredBikes = getFeaturedBikes();

    return (
        <div>
            {/* Hero Section */}
            <section
                style={{
                    minHeight: "85vh",
                    padding: "100px 0",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(to bottom, #0a0a0a, #111)",
                }}
            >
                {/* Abstract Background Element (CSS Only) */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "60vw",
                        height: "60vw",
                        background:
                            "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
                        opacity: 0.2,
                        pointerEvents: "none",
                    }}
                ></div>

                <div
                    className="container"
                    style={{
                        position: "relative",
                        zIndex: 10,
                        textAlign: "center",
                    }}
                >
                    <span
                        className="fade-in"
                        style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            backgroundColor: "rgba(255, 62, 62, 0.1)",
                            color: "var(--color-accent)",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            marginBottom: "24px",
                            border: "1px solid rgba(255, 62, 62, 0.2)",
                        }}
                    >
                        PRECISION ENGINEERING
                    </span>
                    <h1
                        className="slide-up delay-1"
                        style={{
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            fontWeight: "800",
                            lineHeight: 1.1,
                            marginBottom: "24px",
                            fontFamily: "var(--font-display)",
                            opacity: 0,
                        }}
                    >
                        DEFY{" "}
                        <span
                            style={{
                                color: "var(--color-accent)",
                                display: "inline-block",
                                transition:
                                    "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                                opacity: fade ? 1 : 0,
                                fontWeight:
                                    rotatingWords[currentWordIndex] ===
                                    "GRAVITY"
                                        ? "900"
                                        : "800",
                                textShadow:
                                    rotatingWords[currentWordIndex] ===
                                    "GRAVITY"
                                        ? "0 0 30px rgba(255, 62, 62, 0.8), 0 0 60px rgba(255, 62, 62, 0.4)"
                                        : "none",
                                transform:
                                    rotatingWords[currentWordIndex] ===
                                        "GRAVITY" && fade
                                        ? "scale(1.05)"
                                        : "scale(1)",
                            }}
                        >
                            {rotatingWords[currentWordIndex]}
                        </span>
                        .<br />
                        RIDE THE FUTURE.
                    </h1>
                    <p
                        className="slide-up delay-2"
                        style={{
                            fontSize: "1.25rem",
                            color: "var(--color-text-secondary)",
                            maxWidth: "600px",
                            margin: "0 auto 40px",
                            opacity: 0,
                        }}
                    >
                        Experience the ultimate collection of performance
                        machines. From the track to the street, find your
                        perfect ride.
                    </p>
                    <div
                        className="slide-up delay-3"
                        style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "center",
                            opacity: 0,
                        }}
                    >
                        <Link to="/catalog">
                            <Button variant="primary" size="lg">
                                Explore Catalog <ArrowRight size={20} />
                            </Button>
                        </Link>
                        <Link to="/book-test-drive">
                            <Button variant="outline" size="lg">
                                Book Test Drive
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section
                style={{
                    padding: "80px 0",
                    borderBottom: "1px solid var(--color-border)",
                }}
            >
                <div
                    className="container"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "40px",
                    }}
                >
                    {[
                        {
                            icon: <Zap size={40} color="var(--color-accent)" />,
                            title: "Electric Performance",
                            desc: "Instant torque and zero emissions without compromising on speed.",
                        },
                        {
                            icon: (
                                <Shield size={40} color="var(--color-accent)" />
                            ),
                            title: "Safety First",
                            desc: "Advanced traction control and ABS systems keep you in command.",
                        },
                        {
                            icon: (
                                <Trophy size={40} color="var(--color-accent)" />
                            ),
                            title: "Championship DNA",
                            desc: "Born on the track, refined for the street. Feel the racing heritage.",
                        },
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: "30px",
                                backgroundColor: "var(--color-bg-elevated)",
                                borderRadius: "var(--radius-lg)",
                            }}
                        >
                            <div style={{ marginBottom: "20px" }}>
                                {feature.icon}
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    marginBottom: "10px",
                                }}
                            >
                                {feature.title}
                            </h3>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Bikes */}
            <section style={{ padding: "100px 0" }}>
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                            marginBottom: "40px",
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    fontSize: "2.5rem",
                                    fontFamily: "var(--font-display)",
                                    marginBottom: "10px",
                                }}
                            >
                                Featured Models
                            </h2>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                Handpicked selection for the elite rider.
                            </p>
                        </div>
                        <Link to="/catalog">
                            <Button variant="ghost">
                                View All Bikes <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "30px",
                        }}
                    >
                        {featuredBikes.map((bike) => (
                            <BikeCard key={bike.id} bike={bike} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
