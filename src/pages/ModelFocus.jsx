import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/globals.css";
import { bikes } from "../data/bikes";
import Button from "../components/Button";
import { ArrowLeft, CheckCircle, Calendar } from "lucide-react";

const ModelFocus = () => {
    const { id } = useParams();
    const bike = bikes.find((b) => b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!bike) {
        return (
            <div
                className="container"
                style={{ padding: "80px 20px", textAlign: "center" }}
            >
                <h1>Bike not found</h1>
                <Link to="/catalog">
                    <Button variant="outline">Back to Catalog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: "80px" }}>
            {/* Back Button */}
            <div className="container" style={{ padding: "20px" }}>
                <Link
                    to="/catalog"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--color-text-secondary)",
                    }}
                >
                    <ArrowLeft size={16} /> Back to Catalog
                </Link>
            </div>

            {/* Hero / Main Details */}
            <div
                className="container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "60px",
                    alignItems: "center",
                }}
            >
                {/* Image */}
                <div>
                    <img
                        src={
                            bike.image.startsWith("/")
                                ? import.meta.env.BASE_URL + bike.image.slice(1)
                                : bike.image
                        }
                        alt={bike.name}
                        style={{
                            borderRadius: "var(--radius-lg)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                            border: "1px solid var(--color-border)",
                            width: "100%",
                            backgroundColor: "#ffffff",
                            padding: "40px",
                        }}
                    />
                    {bike.disclaimer && (
                        <p
                            style={{
                                marginTop: "10px",
                                fontSize: "0.9rem",
                                color: "var(--color-text-secondary)",
                                fontStyle: "italic",
                            }}
                        >
                            {bike.disclaimer}
                        </p>
                    )}
                </div>

                {/* Info */}
                <div>
                    <div
                        style={{
                            color: "var(--color-accent)",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            marginBottom: "10px",
                        }}
                    >
                        {bike.categoryId} Collection
                    </div>
                    <h1
                        style={{
                            fontSize: "3rem",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.1,
                            marginBottom: "20px",
                        }}
                    >
                        {bike.name}
                    </h1>
                    <div
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginBottom: "30px",
                        }}
                    >
                        ${bike.price.toLocaleString()}
                    </div>

                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "var(--color-text-secondary)",
                            marginBottom: "40px",
                            lineHeight: 1.6,
                        }}
                    >
                        {bike.description}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link to="/book-test-drive" state={{ bikeId: bike.id }}>
                            <Button variant="primary" size="lg">
                                <Calendar size={20} /> Book Test Drive
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Specs Grid */}
            <div className="container" style={{ marginTop: "80px" }}>
                <h2
                    style={{
                        fontSize: "2rem",
                        marginBottom: "40px",
                        borderBottom: "1px solid var(--color-border)",
                        paddingBottom: "20px",
                    }}
                >
                    Technical Specifications
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "30px",
                    }}
                >
                    {Object.entries(bike.specs).map(([key, value]) => (
                        <div
                            key={key}
                            style={{
                                backgroundColor: "var(--color-bg-elevated)",
                                padding: "20px",
                                borderRadius: "var(--radius-md)",
                            }}
                        >
                            <div
                                style={{
                                    color: "var(--color-text-secondary)",
                                    textTransform: "capitalize",
                                    marginBottom: "5px",
                                }}
                            >
                                {key}
                            </div>
                            <div
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                }}
                            >
                                {value}
                            </div>
                        </div>
                    ))}
                    <div
                        style={{
                            backgroundColor: "var(--color-bg-elevated)",
                            padding: "20px",
                            borderRadius: "var(--radius-md)",
                        }}
                    >
                        <div
                            style={{
                                color: "var(--color-text-secondary)",
                                marginBottom: "5px",
                            }}
                        >
                            Warranty
                        </div>
                        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                            2 Years Unlimited
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelFocus;
