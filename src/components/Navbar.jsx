import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { Menu, X, Bike, User } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Models", path: "/catalog" },
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Book Test Drive", path: "/book-test-drive" },
    ];

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !isMobileOpen ? "hidden" : "unset";
    };

    const handleLinkClick = (path) => {
        setIsMobileOpen(false);
        document.body.style.overflow = "unset";
        navigate(path);
    };

    return (
        <nav className="navbar-root">
            <div className="container navbar-container">
                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={() => handleLinkClick("/")}
                >
                    <Bike color="var(--color-accent)" size={32} />
                    <span>ANTIGRAVITY</span>
                </Link>

                <div className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${
                                location.pathname === link.path ? "active" : ""
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="desktop-auth">
                    {currentUser ? (
                        <div className="user-profile-nav">
                            <Link to="/profile" className="profile-trigger">
                                {currentUser.avatar ? (
                                    <img
                                        src={currentUser.avatar}
                                        alt="Profile"
                                        className="nav-avatar"
                                    />
                                ) : (
                                    <div className="nav-avatar-placeholder">
                                        <User size={20} />
                                    </div>
                                )}
                                <span>{currentUser.name}</span>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="auth-actions">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Premium Mobile Toggle */}
                <button
                    className={`mobile-toggle-btn ${
                        isMobileOpen ? "active" : ""
                    }`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Menu"
                >
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </button>
            </div>

            {/* Premium Full-Screen Mobile Menu */}
            <div
                className={`mobile-menu-overlay ${isMobileOpen ? "show" : ""}`}
            >
                <div className="mobile-menu-content">
                    <div className="mobile-nav-list">
                        {navLinks.map((link, idx) => (
                            <div
                                key={link.name}
                                className="mobile-nav-item"
                                style={{
                                    transitionDelay: `${0.1 + idx * 0.05}s`,
                                }}
                            >
                                <button
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`mobile-nav-link-btn ${
                                        location.pathname === link.path
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {link.name}
                                    <span className="accent-line"></span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mobile-menu-footer">
                        {currentUser ? (
                            <div className="mobile-user-card">
                                <div className="user-info">
                                    {currentUser.avatar ? (
                                        <img
                                            src={currentUser.avatar}
                                            alt="Profile"
                                            className="user-avatar-lg"
                                        />
                                    ) : (
                                        <div className="user-avatar-placeholder-lg">
                                            <User size={32} />
                                        </div>
                                    )}
                                    <div className="user-details">
                                        <div className="user-name">
                                            {currentUser.name}
                                        </div>
                                        <div className="user-email">
                                            {currentUser.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="user-actions-grid">
                                    <Button
                                        variant="outline"
                                        style={{ width: "100%" }}
                                        onClick={() =>
                                            handleLinkClick("/profile")
                                        }
                                    >
                                        My Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        style={{
                                            width: "100%",
                                            color: "#ef4444",
                                        }}
                                        onClick={() => {
                                            logout();
                                            toggleMobileMenu();
                                            navigate("/");
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="mobile-auth-grid">
                                <Button
                                    variant="ghost"
                                    style={{
                                        width: "100%",
                                        fontSize: "1.1rem",
                                    }}
                                    onClick={() => handleLinkClick("/login")}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="primary"
                                    style={{
                                        width: "100%",
                                        fontSize: "1.1rem",
                                    }}
                                    onClick={() => handleLinkClick("/register")}
                                >
                                    Register
                                </Button>
                            </div>
                        )}
                        <div className="mobile-copyright">
                            © {new Date().getFullYear()} ANTIGRAVITY MOTORCYCLES
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .navbar-root {
                    height: var(--header-height);
                    background-color: rgba(10, 10, 10, 0.75);
                    backdrop-filter: blur(20px) saturate(180%) contrast(90%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%) contrast(90%);
                    border-bottom: 1px solid var(--color-border);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    transition: all 0.3s ease;
                }

                .navbar-container {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .navbar-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 1.4rem;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    color: var(--color-text-primary);
                    text-decoration: none;
                    z-index: 1001;
                }

                .desktop-nav {
                    display: flex;
                    gap: 32px;
                }

                .nav-link {
                    color: var(--color-text-secondary);
                    font-weight: 500;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .nav-link:hover, .nav-link.active {
                    color: var(--color-text-primary);
                }

                .nav-link.active {
                    color: var(--color-accent);
                    font-weight: 600;
                }

                .user-profile-nav {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .profile-trigger {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 14px;
                    background: var(--color-bg-elevated);
                    border-radius: 100px;
                    text-decoration: none;
                    color: var(--color-text-primary);
                    font-weight: 500;
                    font-size: 0.9rem;
                    border: 1px solid var(--color-border);
                    transition: all 0.2s ease;
                }

                .profile-trigger:hover {
                    border-color: var(--color-accent);
                    background: rgba(255, 62, 62, 0.05);
                }

                .nav-avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .nav-avatar-placeholder {
                    width: 28px;
                    height: 28px;
                    background: var(--color-border);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Mobile Toggle Button */
                .mobile-toggle-btn {
                    display: none;
                    width: 44px;
                    height: 44px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    z-index: 1001;
                    padding: 0;
                    align-items: center;
                    justify-content: center;
                }

                .hamburger-box {
                    width: 24px;
                    height: 18px;
                    display: inline-block;
                    position: relative;
                }

                .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
                    width: 24px;
                    height: 2px;
                    background-color: var(--color-text-primary);
                    position: absolute;
                    transition: all 0.3s ease;
                }

                .hamburger-inner {
                    top: 50%;
                    transform: translateY(-50%);
                }

                .hamburger-inner::before {
                    content: "";
                    top: -8px;
                }

                .hamburger-inner::after {
                    content: "";
                    bottom: -8px;
                }

                .mobile-toggle-btn.active .hamburger-inner {
                    background-color: transparent;
                }

                .mobile-toggle-btn.active .hamburger-inner::before {
                    transform: translateY(8px) rotate(45deg);
                }

                .mobile-toggle-btn.active .hamburger-inner::after {
                    transform: translateY(-8px) rotate(-45deg);
                }

                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-color: rgba(10, 10, 10, 0.9);
                    backdrop-filter: blur(20px) saturate(180%) contrast(90%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%) contrast(90%);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    transform: translateY(-100%);
                    transition: all 0.6s cubic-bezier(0.82, 0, 0.12, 1);
                    opacity: 0;
                    visibility: hidden;
                }

                .mobile-menu-overlay.show {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }

                .mobile-menu-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    padding: calc(var(--header-height) + 40px) 24px 40px;
                    overflow-y: auto;
                }

                .mobile-nav-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .mobile-nav-item {
                    transform: translateY(20px);
                    opacity: 0;
                    transition: all 0.4s ease;
                }

                .mobile-menu-overlay.show .mobile-nav-item {
                    transform: translateY(0);
                    opacity: 1;
                }

                .mobile-nav-link-btn {
                    width: 100%;
                    text-align: left;
                    background: transparent;
                    border: none;
                    color: var(--color-text-secondary); /* Match desktop default */
                    font-size: 0.95rem; /* Matched to desktop */
                    font-weight: 500; /* Matched to desktop */
                    padding: 12px 0;
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.2s ease;
                }

                .mobile-nav-link-btn:hover, .mobile-nav-link-btn.active {
                    color: var(--color-text-primary);
                }

                .mobile-nav-link-btn.active {
                    color: var(--color-accent);
                    font-weight: 600;
                }

                .mobile-nav-link-btn.active .accent-line {
                    width: 100%;
                }

                .accent-line {
                    height: 4px;
                    width: 0;
                    background: var(--color-accent);
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                    transition: width 0.3s ease;
                }

                .mobile-nav-link-btn:active .accent-line {
                    width: 40px;
                }

                .mobile-menu-footer {
                    margin-top: auto;
                    padding-top: 40px;
                }

                .mobile-user-card {
                    background: var(--color-bg-elevated);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    margin-bottom: 30px;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 24px;
                }

                .user-avatar-lg {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid var(--color-accent);
                }

                .user-avatar-placeholder-lg {
                    width: 56px;
                    height: 56px;
                    background: var(--color-bg-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--color-border);
                }

                .user-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .user-email {
                    color: var(--color-text-secondary);
                    font-size: 0.9rem;
                }

                .user-actions-grid, .mobile-auth-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .mobile-copyright {
                    text-align: center;
                    color: var(--color-text-muted);
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                    margin-top: 30px;
                    font-weight: 600;
                }

                @media (max-width: 992px) {
                    .desktop-nav, .desktop-auth {
                        display: none;
                    }
                    .mobile-toggle-btn {
                        display: flex;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
