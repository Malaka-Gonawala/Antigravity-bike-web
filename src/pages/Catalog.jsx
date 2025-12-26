import React, { useState, useMemo } from "react";
import "../styles/globals.css";
import { bikes, brands, categories } from "../data/bikes";
import BikeCard from "../components/BikeCard";
import Button from "../components/Button";
import { Filter, X } from "lucide-react";

const Catalog = () => {
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Filter Logic
    const filteredBikes = useMemo(() => {
        return bikes.filter((bike) => {
            const brandMatch =
                selectedBrand === "all" || bike.brandId === selectedBrand;
            const catMatch =
                selectedCategory === "all" ||
                bike.categoryId === selectedCategory;
            return brandMatch && catMatch;
        });
    }, [selectedBrand, selectedCategory]);

    return (
        <div className="container" style={{ padding: "40px 20px" }}>
            {/* Header */}
            <div
                style={{
                    marginBottom: "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: "3rem",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1,
                        }}
                    >
                        Catalog
                    </h1>
                    <p
                        style={{
                            color: "var(--color-text-secondary)",
                            marginTop: "10px",
                        }}
                    >
                        Showing {filteredBikes.length} results
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="mobile-filter-btn">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={18} /> Filters
                    </Button>
                </div>
            </div>

            <div style={{ display: "flex", gap: "40px", position: "relative" }}>
                {/* Sidebar Filters */}
                <aside
                    className={`filters-sidebar ${showFilters ? "open" : ""}`}
                >
                    <div
                        style={{
                            marginBottom: "30px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h3 style={{ fontSize: "1.2rem", margin: 0 }}>
                            Brands
                        </h3>
                        {/* Mobile close button */}
                        <button
                            className="mobile-close-btn"
                            onClick={() => setShowFilters(false)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--color-text-secondary)",
                                cursor: "pointer",
                            }}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div style={{ marginBottom: "30px" }}>
                        {selectedBrand !== "all" && (
                            <button
                                onClick={() => setSelectedBrand("all")}
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--color-accent)",
                                    textDecoration: "underline",
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Reset Brands
                            </button>
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {brands.map((brand) => (
                                <label
                                    key={brand.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        cursor: "pointer",
                                        color:
                                            selectedBrand === brand.id
                                                ? "var(--color-text-primary)"
                                                : "var(--color-text-secondary)",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="brand"
                                        checked={selectedBrand === brand.id}
                                        onChange={() =>
                                            setSelectedBrand(brand.id)
                                        }
                                        style={{
                                            accentColor: "var(--color-accent)",
                                        }}
                                    />
                                    {brand.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "16px",
                            }}
                        >
                            <h3 style={{ fontSize: "1.2rem", margin: 0 }}>
                                Categories
                            </h3>
                        </div>
                        {selectedCategory !== "all" && (
                            <button
                                onClick={() => setSelectedCategory("all")}
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--color-accent)",
                                    textDecoration: "underline",
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Reset Categories
                            </button>
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {categories.map((cat) => (
                                <label
                                    key={cat.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        cursor: "pointer",
                                        color:
                                            selectedCategory === cat.id
                                                ? "var(--color-text-primary)"
                                                : "var(--color-text-secondary)",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === cat.id}
                                        onChange={() =>
                                            setSelectedCategory(cat.id)
                                        }
                                        style={{
                                            accentColor: "var(--color-accent)",
                                        }}
                                    />
                                    {cat.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* CSS for responsive sidebar visibility */}
                {/* CSS for responsive sidebar visibility */}
                <style>{`
          .filters-sidebar {
            width: 250px;
            flex-shrink: 0;
            /* Sticky Positioning */
            position: sticky;
            top: 100px; /* Header height + spacing */
            align-self: start;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
          }
          
          .mobile-close-btn { display: none !important; }
          .mobile-filter-btn { display: none; }

          @media (max-width: 768px) {
            .mobile-filter-btn { display: block; margin-top: 20px; width: 100%; }
            .mobile-filter-btn button { width: 100%; }

            .filters-sidebar { 
              position: fixed;
              top: 0; left: 0; bottom: 0;
              width: 85%;
              max-width: 300px;
              background: var(--color-bg-elevated);
              z-index: 200;
              padding: 24px;
              box-shadow: 10px 0 30px rgba(0,0,0,0.5);
              border-right: 1px solid var(--color-border);
              transform: translateX(-100%);
              transition: transform 0.3s ease;
              /* Reset sticky for mobile */
              max-height: none;
              align-self: auto;
            }
            .filters-sidebar.open {
                transform: translateX(0);
            }
            .mobile-close-btn { display: block !important; }
          }
        `}</style>

                {/* Overlay for mobile */}
                {showFilters && (
                    <div
                        onClick={() => setShowFilters(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(2px)",
                            zIndex: 199,
                        }}
                        className="mobile-overlay"
                    />
                )}

                {/* Grid */}
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "30px",
                        }}
                    >
                        {filteredBikes.map((bike) => (
                            <BikeCard key={bike.id} bike={bike} />
                        ))}
                    </div>

                    {filteredBikes.length === 0 && (
                        <div
                            style={{
                                padding: "40px",
                                textAlign: "center",
                                color: "var(--color-text-secondary)",
                            }}
                        >
                            <h3>No bikes found.</h3>
                            <p>Try adjusting your filters.</p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedBrand("all");
                                    setSelectedCategory("all");
                                }}
                                style={{ marginTop: "20px" }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
