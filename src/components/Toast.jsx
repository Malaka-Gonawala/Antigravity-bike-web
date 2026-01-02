import React from "react";
import { useNotification } from "../context/NotificationContext";
import { X } from "lucide-react";

const Toast = () => {
    const { toasts, removeToast } = useNotification();

    if (toasts.length === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="fade-in-up"
                    style={{
                        minWidth: "300px",
                        padding: "16px",
                        backgroundColor:
                            toast.type === "success"
                                ? "#22c55e"
                                : toast.type === "error"
                                ? "#ef4444"
                                : "#3b82f6",
                        color: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        animation: "slideIn 0.3s ease-out",
                    }}
                >
                    <span style={{ fontWeight: "500" }}>{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            padding: "4px",
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
            <style>
                {`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default Toast;
