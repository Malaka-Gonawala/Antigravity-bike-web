import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FinancingCalculator = ({ price }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const minDownPayment = price * 0.1; // 10% minimum
    const [downPayment, setDownPayment] = useState(price * 0.2); // 20% default
    const [loanTerm, setLoanTerm] = useState(36); // months
    const interestRate = 4.9; // Fixed promotional APR

    // Calculate monthly payment using loan formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const calculateMonthlyPayment = () => {
        const principal = price - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm;

        if (principal <= 0 || monthlyRate === 0) {
            return principal / numberOfPayments;
        }

        const monthlyPayment =
            (principal *
                (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return monthlyPayment;
    };

    const monthlyPayment = calculateMonthlyPayment();
    const totalPaid = monthlyPayment * loanTerm + downPayment;
    const totalInterest = totalPaid - price;

    const handleDownPaymentChange = (value) => {
        // Enforce min/max
        const newValue = Math.max(minDownPayment, Math.min(price, value));
        setDownPayment(newValue);
    };

    return (
        <div
            style={{
                backgroundColor: "var(--color-bg-elevated)",
                padding: "30px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                marginTop: "30px",
            }}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    color: "var(--color-text-primary)",
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    padding: 0,
                }}
            >
                <span>💰 Financing Calculator</span>
                {isExpanded ? (
                    <ChevronUp size={24} />
                ) : (
                    <ChevronDown size={24} />
                )}
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    transition:
                        "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        minHeight: 0,
                        opacity: isExpanded ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                >
                    <div style={{ marginTop: "30px" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "20px",
                                marginBottom: "30px",
                            }}
                        >
                            {/* Down Payment */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "0.9rem",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    Down Payment (Min 10%)
                                </label>
                                <input
                                    type="number"
                                    value={Math.round(downPayment)}
                                    onChange={(e) =>
                                        handleDownPaymentChange(
                                            Number(e.target.value)
                                        )
                                    }
                                    min={minDownPayment}
                                    max={price}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--color-border)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "var(--color-text-primary)",
                                        fontSize: "1rem",
                                    }}
                                />
                                <input
                                    type="range"
                                    min={minDownPayment}
                                    max={price}
                                    value={downPayment}
                                    onChange={(e) =>
                                        handleDownPaymentChange(
                                            Number(e.target.value)
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        marginTop: "8px",
                                        accentColor: "var(--color-accent)",
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "var(--color-text-secondary)",
                                        marginTop: "4px",
                                    }}
                                >
                                    {((downPayment / price) * 100).toFixed(0)}%
                                    of €{price.toLocaleString()}
                                </p>
                            </div>

                            {/* Loan Term */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "0.9rem",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    Loan Term
                                </label>
                                <select
                                    value={loanTerm}
                                    onChange={(e) =>
                                        setLoanTerm(Number(e.target.value))
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--color-border)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "var(--color-text-primary)",
                                        fontSize: "1rem",
                                    }}
                                >
                                    <option value={12}>12 months</option>
                                    <option value={24}>24 months</option>
                                    <option value={36}>36 months</option>
                                    <option value={48}>48 months</option>
                                    <option value={60}>60 months</option>
                                </select>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "0.9rem",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    Interest Rate (APR)
                                </label>
                                <div
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--color-border)",
                                        backgroundColor:
                                            "var(--color-bg-primary)",
                                        color: "var(--color-accent)",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    {interestRate}%
                                    <span
                                        style={{
                                            fontSize: "0.7rem",
                                            backgroundColor:
                                                "var(--color-accent)",
                                            color: "white",
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Fixed
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "var(--color-text-secondary)",
                                        marginTop: "8px",
                                    }}
                                >
                                    Standard promotional rate for Antigravity
                                    Bikes.
                                </p>
                            </div>
                        </div>

                        {/* Results */}
                        <div
                            style={{
                                backgroundColor: "var(--color-bg-primary)",
                                padding: "25px",
                                borderRadius: "var(--radius-md)",
                                border: "2px solid var(--color-accent)",
                            }}
                        >
                            <div
                                style={{
                                    textAlign: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "var(--color-text-secondary)",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Estimated Monthly Payment
                                </p>
                                <p
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: "bold",
                                        color: "var(--color-accent)",
                                    }}
                                >
                                    €
                                    {monthlyPayment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "var(--color-text-secondary)",
                                    }}
                                >
                                    per month for {loanTerm} months
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "20px",
                                    paddingTop: "20px",
                                    borderTop: "1px solid var(--color-border)",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--color-text-secondary)",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        Total Interest
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: "600",
                                        }}
                                    >
                                        €
                                        {totalInterest.toLocaleString(
                                            undefined,
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--color-text-secondary)",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        Total Amount
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: "600",
                                        }}
                                    >
                                        €
                                        {totalPaid.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancingCalculator;
