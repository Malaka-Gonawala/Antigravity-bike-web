import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Utility: Title Case
    const toTitleCase = (str) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Utility: SHA-256 Hashing
    const hashPassword = async (password) => {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

    const login = async (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const hashedPassword = await hashPassword(password);

        const user = users.find(
            (u) => u.email === email && u.password === hashedPassword
        );

        if (user) {
            // Increment login count
            user.loginCount = (user.loginCount || 0) + 1;

            // Update user in local storage users array
            const updatedUsers = users.map((u) =>
                u.email === user.email ? user : u
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));

            return { success: true, loginCount: user.loginCount };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const register = async (name, email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find((u) => u.email === email)) {
            return { success: false, message: "User already exists" };
        }

        const formattedName = toTitleCase(name);
        const hashedPassword = await hashPassword(password);

        const newUser = {
            name: formattedName,
            email,
            password: hashedPassword,
            loginCount: 0,
            id: Date.now(),
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    const updateUser = async (data) => {
        if (!currentUser) return;

        let updatedData = { ...data };

        // Apply formatting/hashing if fields exist
        if (updatedData.name) {
            updatedData.name = toTitleCase(updatedData.name);
        }
        if (updatedData.password) {
            updatedData.password = await hashPassword(updatedData.password);
        }

        const updatedUser = { ...currentUser, ...updatedData };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Update in users array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((u) =>
            u.email === currentUser.email ? updatedUser : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Simulation logic: Assign decision time for Pending applications
        if (data.applications) {
            const newPendingApps = data.applications.filter(
                (app) => app.status === "Pending" && !app.decisionTime
            );

            if (newPendingApps.length > 0) {
                const markedApps = data.applications.map((app) => {
                    if (app.status === "Pending" && !app.decisionTime) {
                        // Random delay between 10 seconds and 1 hour
                        const randomDelay =
                            Math.floor(Math.random() * (3600000 - 10000 + 1)) +
                            10000;
                        return {
                            ...app,
                            decisionTime: Date.now() + randomDelay,
                        };
                    }
                    return app;
                });

                const userWithTimes = {
                    ...updatedUser,
                    applications: markedApps,
                };
                setCurrentUser(userWithTimes);
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(userWithTimes)
                );

                // Update global users
                const users = JSON.parse(localStorage.getItem("users") || "[]");
                const allUsersUpdated = users.map((u) =>
                    u.email === userWithTimes.email ? userWithTimes : u
                );
                localStorage.setItem("users", JSON.stringify(allUsersUpdated));
            }
        }
    };

    // Effect: Process Pending Applications based on decisionTime
    useEffect(() => {
        if (!currentUser?.applications) return;

        const checkApplications = () => {
            const now = Date.now();
            let hasTypos = false;

            const updatedApps = currentUser.applications.map((app) => {
                if (
                    app.status === "Pending" &&
                    app.decisionTime &&
                    now >= app.decisionTime
                ) {
                    hasTypos = true;
                    return {
                        ...app,
                        status: Math.random() > 0.5 ? "Accepted" : "Rejected",
                        decisionDate: new Date().toLocaleDateString(),
                    };
                }
                return app;
            });

            if (hasTypos) {
                const updatedUser = {
                    ...currentUser,
                    applications: updatedApps,
                };
                setCurrentUser(updatedUser);
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(updatedUser)
                );

                const users = JSON.parse(localStorage.getItem("users") || "[]");
                const allUsersUpdated = users.map((u) =>
                    u.email === updatedUser.email ? updatedUser : u
                );
                localStorage.setItem("users", JSON.stringify(allUsersUpdated));
            }
        };

        const intervalId = setInterval(checkApplications, 2000); // Check every 2 seconds
        return () => clearInterval(intervalId);
    }, [currentUser]);

    const deleteAccount = async (password) => {
        if (!currentUser)
            return { success: false, message: "No user logged in" };

        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== currentUser.password) {
            return { success: false, message: "Incorrect password" };
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.filter((u) => u.email !== currentUser.email);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        logout();
        return { success: true };
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                register,
                logout,
                loading,
                updateUser,
                deleteAccount,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
