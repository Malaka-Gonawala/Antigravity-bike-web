import React from "react";
import "../styles/globals.css"; // Ensure variables are available

const Button = ({
    children,
    variant = "primary", // primary, outline, ghost
    size = "md", // sm, md, lg
    fullWidth = false,
    onClick,
    type = "button",
    className = "",
    disabled = false,
}) => {
    const baseStyles = {
        padding:
            size === "sm"
                ? "8px 16px"
                : size === "lg"
                ? "14px 28px"
                : "10px 20px",
        fontSize:
            size === "sm" ? "0.875rem" : size === "lg" ? "1.125rem" : "1rem",
        borderRadius: "var(--radius-md)",
        fontWeight: "600",
        transition: "all var(--transition-fast)",
        width: fullWidth ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
    };

    const variants = {
        primary: {
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            boxShadow: "0 4px 14px var(--color-accent-glow)",
        },
        outline: {
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
        },
        ghost: {
            backgroundColor: "transparent",
            color: "var(--color-text-secondary)",
        },
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyles, ...variants[variant] }}
            className={className}
        >
            {children}
        </button>
    );
};

export default Button;
