import { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
    const [view, setView] = useState('card')
    const [gradientType, setGradientType] = useState('linear-gradient')

    return (
        <ViewContext.Provider value={{ view, setView, gradientType, setGradientType }}>
            {children}
        </ViewContext.Provider>
    )
}