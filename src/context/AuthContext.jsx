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

    const login = (email, password) => {
        // Mock login logic
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find((u) => u.email === email)) {
            return { success: false, message: "User already exists" };
        }

        const newUser = { name, email, password, id: Date.now() };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // No auto-login
        // setCurrentUser(newUser);
        // localStorage.setItem("currentUser", JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    const updateUser = (data) => {
        if (!currentUser) return;

        const updatedUser = { ...currentUser, ...data };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Update in users array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((u) =>
            u.email === currentUser.email ? updatedUser : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Simulation logic: Process Pending applications after 2 seconds
        if (data.applications) {
            const newPendingApps = data.applications.filter(
                (app) =>
                    app.status === "Pending" &&
                    // Only trigger if we aren't already processing (avoid infinite loops)
                    !app.simulationStarted
            );

            if (newPendingApps.length > 0) {
                // Mark them as simulation started so we don't repeat this
                const markedApps = data.applications.map((app) =>
                    app.status === "Pending"
                        ? { ...app, simulationStarted: true }
                        : app
                );

                // Update state immediately with simulationStarted flag
                const userWithFlag = {
                    ...updatedUser,
                    applications: markedApps,
                };
                setCurrentUser(userWithFlag);
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(userWithFlag)
                );

                // Process each pending app with a random delay between 10s and 1h
                newPendingApps.forEach((pendingApp) => {
                    const randomDelay =
                        Math.floor(Math.random() * (3600000 - 10000 + 1)) +
                        10000;

                    setTimeout(() => {
                        const finalStatus =
                            Math.random() > 0.5 ? "Accepted" : "Rejected";

                        // Get fresh user data from state (to avoid stale closures)
                        setCurrentUser((prevUser) => {
                            if (!prevUser) return null;
                            const currentApps = prevUser.applications || [];
                            const updatedApps = currentApps.map((a) =>
                                a.id === pendingApp.id
                                    ? { ...a, status: finalStatus }
                                    : a
                            );

                            const finalUser = {
                                ...prevUser,
                                applications: updatedApps,
                            };
                            localStorage.setItem(
                                "currentUser",
                                JSON.stringify(finalUser)
                            );

                            // Update in global users list too
                            const allUsers = JSON.parse(
                                localStorage.getItem("users") || "[]"
                            );
                            const allUsersUpdated = allUsers.map((u) =>
                                u.email === prevUser.email ? finalUser : u
                            );
                            localStorage.setItem(
                                "users",
                                JSON.stringify(allUsersUpdated)
                            );

                            return finalUser;
                        });
                    }, randomDelay);
                });
            }
        }
    };

    const deleteAccount = () => {
        if (!currentUser) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.filter((u) => u.email !== currentUser.email);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        logout();
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
