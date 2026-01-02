import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("compareList");
        if (stored) {
            setCompareList(JSON.parse(stored));
        }
    }, []);

    // Persist to localStorage on changes
    useEffect(() => {
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (bike) => {
        if (compareList.length >= 3) {
            return {
                success: false,
                message: "Maximum 3 bikes can be compared",
            };
        }
        if (compareList.some((b) => b.id === bike.id)) {
            return { success: false, message: "Bike already in comparison" };
        }
        setCompareList([...compareList, bike]);
        return { success: true };
    };

    const removeFromCompare = (bikeId) => {
        setCompareList(compareList.filter((b) => b.id !== bikeId));
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    const isInCompare = (bikeId) => {
        return compareList.some((b) => b.id === bikeId);
    };

    return (
        <CompareContext.Provider
            value={{
                compareList,
                addToCompare,
                removeFromCompare,
                clearCompare,
                isInCompare,
            }}
        >
            {children}
        </CompareContext.Provider>
    );
};
