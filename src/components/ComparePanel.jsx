import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { X } from "lucide-react";
import Button from "./Button";

const ComparePanel = () => {
    const { compareList, removeFromCompare } = useCompare();
    const navigate = useNavigate();

    if (compareList.length === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "var(--color-bg-elevated)",
                borderTop: "2px solid var(--color-accent)",
                padding: "20px",
                zIndex: 100,
                boxShadow: "0 -10px 30px rgba(0,0,0,0.3)",
                animation: "slideUp 0.3s ease",
            }}
        >
            <style>
                {`
                    @keyframes slideUp {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <span style={{ fontWeight: "600" }}>
                        Compare ({compareList.length}/3):
                    </span>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flex: 1,
                            overflow: "auto",
                        }}
                    >
                        {compareList.map((bike) => (
                            <div
                                key={bike.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    backgroundColor: "var(--color-bg-primary)",
                                    padding: "8px 12px",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--color-border)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <img
                                    src={
                                        bike.image.startsWith("/")
                                            ? import.meta.env.BASE_URL +
                                              bike.image.slice(1)
                                            : bike.image
                                    }
                                    alt={bike.name}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "contain",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                    }}
                                />
                                <span style={{ fontSize: "0.9rem" }}>
                                    {bike.name}
                                </span>
                                <button
                                    onClick={() => removeFromCompare(bike.id)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "var(--color-text-secondary)",
                                        cursor: "pointer",
                                        padding: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate("/compare")}
                >
                    Compare Now
                </Button>
            </div>
        </div>
    );
};

export default ComparePanel;
