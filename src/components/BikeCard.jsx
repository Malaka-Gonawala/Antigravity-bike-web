import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";

const BikeCard = ({ bike }) => {
    const { currentUser, updateUser } = useAuth();

    const isWatchlisted = currentUser?.watchlist?.includes(bike.id);

    const toggleWatchlist = (e) => {
        e.preventDefault(); // Prevent Link navigation
        if (!currentUser) {
            alert("Please login to add to watchlist");
            return;
        }

        const currentWatchlist = currentUser.watchlist || [];
        let newWatchlist;
        if (isWatchlisted) {
            newWatchlist = currentWatchlist.filter((id) => id !== bike.id);
        } else {
            newWatchlist = [...currentWatchlist, bike.id];
        }

        updateUser({ watchlist: newWatchlist });
    };

    return (
        <div
            className="bike-card"
            style={{
                backgroundColor: "var(--color-bg-elevated)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative", // For absolute positioning of heart
            }}
        >
            {/* Watchlist Button */}
            <button
                onClick={toggleWatchlist}
                style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    zIndex: 10,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
                <Heart
                    size={20}
                    color={isWatchlisted ? "#ef4444" : "#fff"}
                    fill={isWatchlisted ? "#ef4444" : "none"}
                />
            </button>

            {/* Image Area */}
            <div
                style={{
                    position: "relative",
                    height: "240px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff", // White background to blend with JPEGs
                }}
            >
                <img
                    src={bike.image}
                    alt={bike.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "10px", // Add some padding so it doesn't touch the edges
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        padding: "4px 8px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        color: "var(--color-text-primary)",
                    }}
                >
                    {bike.brandId.toUpperCase()}
                </div>
            </div>

            {/* Content Area */}
            <div
                style={{
                    padding: "20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        color: "var(--color-accent)",
                        fontWeight: "bold",
                        marginBottom: "8px",
                    }}
                >
                    {bike.categoryId} series
                </div>

                <h3
                    style={{
                        fontSize: "1.25rem",
                        marginBottom: "10px",
                        fontFamily: "var(--font-display)",
                        lineHeight: 1.2,
                    }}
                >
                    {bike.name}
                </h3>

                <div
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        color: "var(--color-text-primary)",
                    }}
                >
                    $
                    {bike.price.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                    })}
                </div>

                <div style={{ marginTop: "auto" }}>
                    <Link to={`/bike/${bike.id}`} style={{ width: "100%" }}>
                        <Button variant="outline" fullWidth size="sm">
                            View Details <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BikeCard;
