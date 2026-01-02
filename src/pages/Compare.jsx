import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { brands, categories } from "../data/bikes";
import Button from "../components/Button";
import { X, Plus } from "lucide-react";
import "../styles/globals.css";

const Compare = () => {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    const getBrandName = (brandId) => {
        return brands.find((b) => b.id === brandId)?.name || "Unknown";
    };

    const getCategoryName = (categoryId) => {
        return categories.find((c) => c.id === categoryId)?.name || "Unknown";
    };

    if (compareList.length === 0) {
        return (
            <div
                className="container"
                style={{ padding: "80px 20px", textAlign: "center" }}
            >
                <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                    No Bikes to Compare
                </h1>
                <p
                    style={{
                        color: "var(--color-text-secondary)",
                        marginBottom: "30px",
                    }}
                >
                    Add bikes from the catalog to start comparing.
                </p>
                <Link to="/catalog">
                    <Button variant="primary" size="lg">
                        <Plus size={18} style={{ marginRight: "8px" }} />
                        Browse Catalog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: "60px 20px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontFamily: "var(--font-display)",
                    }}
                >
                    Compare Bikes
                </h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link to="/catalog">
                        <Button variant="outline">
                            <Plus size={18} style={{ marginRight: "8px" }} />
                            Add More
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={clearCompare}>
                        Clear All
                    </Button>
                </div>
            </div>

            {/* Comparison Table */}
            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: "20px",
                    }}
                >
                    <tbody>
                        {/* Images */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                    minWidth: "120px",
                                }}
                            >
                                Image
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                        textAlign: "center",
                                        position: "relative",
                                        verticalAlign: "top",
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            removeFromCompare(bike.id)
                                        }
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px",
                                            background:
                                                "var(--color-bg-primary)",
                                            border: "1px solid var(--color-border)",
                                            borderRadius: "50%",
                                            width: "32px",
                                            height: "32px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                    <img
                                        src={
                                            bike.image.startsWith("/")
                                                ? import.meta.env.BASE_URL +
                                                  bike.image.slice(1)
                                                : bike.image
                                        }
                                        alt={bike.name}
                                        style={{
                                            width: "100%",
                                            maxWidth: "250px",
                                            height: "200px",
                                            objectFit: "contain",
                                            backgroundColor: "#fff",
                                            borderRadius: "var(--radius-md)",
                                            padding: "20px",
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>

                        {/* Name */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Model
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                        fontSize: "1.2rem",
                                        fontWeight: "600",
                                    }}
                                >
                                    {bike.name}
                                </td>
                            ))}
                        </tr>

                        {/* Brand */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Brand
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                    }}
                                >
                                    {getBrandName(bike.brandId)}
                                </td>
                            ))}
                        </tr>

                        {/* Category */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Category
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                    }}
                                >
                                    {getCategoryName(bike.categoryId)}
                                </td>
                            ))}
                        </tr>

                        {/* Price */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Price
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                        fontSize: "1.3rem",
                                        fontWeight: "600",
                                        color: "var(--color-accent)",
                                    }}
                                >
                                    {bike.formattedPrice}
                                </td>
                            ))}
                        </tr>

                        {/* Weight */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Weight
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                    }}
                                >
                                    {bike.specs.weight}
                                </td>
                            ))}
                        </tr>

                        {/* Engine */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Engine
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                    }}
                                >
                                    {bike.specs.engine}
                                </td>
                            ))}
                        </tr>

                        {/* Power */}
                        <tr>
                            <td
                                style={{
                                    fontWeight: "600",
                                    verticalAlign: "middle",
                                }}
                            >
                                Power
                            </td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                    }}
                                >
                                    {bike.specs.power}
                                </td>
                            ))}
                        </tr>

                        {/* Action Button */}
                        <tr>
                            <td></td>
                            {compareList.map((bike) => (
                                <td
                                    key={bike.id}
                                    style={{
                                        backgroundColor:
                                            "var(--color-bg-elevated)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Link to={`/bike/${bike.id}`}>
                                        <Button variant="primary" fullWidth>
                                            View Details
                                        </Button>
                                    </Link>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Compare;
