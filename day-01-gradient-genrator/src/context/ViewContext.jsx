import { createContext, useEffect, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
    const [gradient, setGradient] = useState('')
    const [view, setView] = useState('card')
    const [gradientType, setGradientType] = useState('linear-gradient')
    const [degree, setDegree] = useState('90')
    const [colours, setColours] = useState([])

    const generateGradient = () => {
        const baseColour = 255 * 255 * 255
        const randomColours = [
            `#${(Math.floor(Math.random() * baseColour).toString(16)).padStart(6, 0)}`,
            `#${(Math.floor(Math.random() * baseColour).toString(16)).padStart(6, 0)}`
        ]
        setColours(randomColours)
    }

    useEffect(() => {
        if (colours.length === 2) {
            if (gradientType === "linear-gradient") {
                setGradient(`${gradientType}(${degree}deg, ${colours[0]}, ${colours[1]})`);
            } else {
                setGradient(`${gradientType}(circle, ${colours[0]}, ${colours[1]})`);
            }
        }
    }, [gradientType, degree, colours])

    return (
        <ViewContext.Provider value={{ gradient, view, setView, gradientType, setGradientType, degree, setDegree, generateGradient, colours, setColours }}>
            {children}
        </ViewContext.Provider>
    )
}