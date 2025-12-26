import React from "react";
import { Bike, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import "../styles/globals.css";

const Footer = () => {
    const location = useLocation();

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/catalog", label: "Models" },
        { path: "/book-test-drive", label: "Book Test Drive" },
    ];

    return (
        <footer
            style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderTop: "1px solid var(--color-border)",
                padding: "60px 0 20px",
                marginTop: "auto",
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "40px",
                        marginBottom: "40px",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginBottom: "20px",
                            }}
                        >
                            <Bike color="var(--color-accent)" size={32} />
                            <span>ANTIGRAVITY</span>
                        </div>
                        <p
                            style={{
                                color: "var(--color-text-secondary)",
                                lineHeight: 1.6,
                            }}
                        >
                            Redefining the boundaries of speed and style. The
                            premier destination for elite performance
                            motorcycles.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4
                            style={{
                                fontSize: "1.1rem",
                                marginBottom: "20px",
                                color: "#fff",
                            }}
                        >
                            Explore
                        </h4>
                        <ul
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="footer-link"
                                        style={{
                                            color:
                                                location.pathname === link.path
                                                    ? "var(--color-accent)"
                                                    : "var(--color-text-secondary)",
                                            transition: "color 0.2s",
                                            fontWeight:
                                                location.pathname === link.path
                                                    ? "600"
                                                    : "400",
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4
                            style={{
                                fontSize: "1.1rem",
                                marginBottom: "20px",
                                color: "#fff",
                            }}
                        >
                            Company
                        </h4>
                        <ul
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <li>
                                <Link
                                    to="/about"
                                    className="footer-link"
                                    style={{
                                        color:
                                            location.pathname === "/about"
                                                ? "var(--color-accent)"
                                                : "var(--color-text-secondary)",
                                        transition: "all 0.2s",
                                        fontWeight:
                                            location.pathname === "/about"
                                                ? "600"
                                                : "400",
                                    }}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/careers"
                                    className="footer-link"
                                    style={{
                                        color:
                                            location.pathname === "/careers"
                                                ? "var(--color-accent)"
                                                : "var(--color-text-secondary)",
                                        transition: "all 0.2s",
                                        fontWeight:
                                            location.pathname === "/careers"
                                                ? "600"
                                                : "400",
                                    }}
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="footer-link"
                                    style={{
                                        color:
                                            location.pathname === "/privacy"
                                                ? "var(--color-accent)"
                                                : "var(--color-text-secondary)",
                                        transition: "all 0.2s",
                                        fontWeight:
                                            location.pathname === "/privacy"
                                                ? "600"
                                                : "400",
                                    }}
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="footer-link"
                                    style={{
                                        color:
                                            location.pathname === "/terms"
                                                ? "var(--color-accent)"
                                                : "var(--color-text-secondary)",
                                        transition: "all 0.2s",
                                        fontWeight:
                                            location.pathname === "/terms"
                                                ? "600"
                                                : "400",
                                    }}
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4
                            style={{
                                fontSize: "1.1rem",
                                marginBottom: "20px",
                                color: "#fff",
                            }}
                        >
                            Connect
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                gap: "16px",
                                color: "var(--color-text-secondary)",
                            }}
                        >
                            <Instagram
                                size={24}
                                className="social-icon social-instagram"
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            />
                            <Facebook
                                size={24}
                                className="social-icon social-facebook"
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            />
                            <svg
                                className="social-icon social-x"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <Youtube
                                size={24}
                                className="social-icon social-youtube"
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: "1px solid var(--color-border)",
                        paddingTop: "20px",
                        textAlign: "center",
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                    }}
                >
                    &copy; {new Date().getFullYear()} Antigravity Bikes via
                    Codeium. All rights reserved.
                </div>
            </div>

            {/* Hover styles */}
            <style>{`
                .footer-link:hover {
                    color: var(--color-accent) !important;
                }
                
                .social-icon {
                    color: var(--color-text-secondary);
                }
                
                .social-icon:hover {
                    transform: translateY(-2px);
                }
                
                /* Individual social media brand colors */
                .social-instagram:hover {
                    color: #E4405F !important; /* Instagram purple/pink */
                }
                
                .social-facebook:hover {
                    color: #1877F2 !important; /* Facebook blue */
                }
                
                .social-x:hover {
                    color: #FFFFFF !important; /* X (Twitter) white */
                }
                
                .social-youtube:hover {
                    color: var(--color-accent) !important; /* YouTube red (keeping accent) */
                }
            `}</style>
        </footer>
    );
};

export default Footer;
