import { createContext, useCallback, useEffect, useState } from "react";

const ViewContext = createContext();

function ViewProvider({ children }) {
    const [gradient, setGradient] = useState('')
    const [view, setView] = useState('card')
    const [gradientType, setGradientType] = useState('linear-gradient')
    const [degree, setDegree] = useState('90')
    const [colours, setColours] = useState([])
    const [theme, setTheme] = useState('light')

    const randomHSL = (lRange = [50, 60]) => {
        const h = Math.floor(Math.random() * 360);
        const s = 30 + Math.floor(Math.random() * 40); // 60–80%
        const l = lRange[0] + Math.floor(Math.random() * (lRange[1] - lRange[0]));
        return `hsl(${h}, ${s}%, ${l}%)`;
    };

    const generateGradient = useCallback(() => {
        let coloursPair;
        if (theme === "light") {
            coloursPair = [randomHSL([50, 70]), randomHSL([50, 70])];
        } else {
            coloursPair = [randomHSL([10, 40]), randomHSL([10, 40])];
        }
        setColours(coloursPair);
    }, [theme]);

    useEffect(() => {
        if (colours.length === 2) {
            if (gradientType === "linear-gradient") {
                setGradient(`${gradientType}(${degree}deg, ${colours[0]}, ${colours[1]})`);
            } else {
                setGradient(`${gradientType}(circle, ${colours[0]}, ${colours[1]})`);
            }
        }
    }, [gradientType, degree, colours])

    useEffect(() => {
        generateGradient();
    }, [theme]);

    return (
        <ViewContext.Provider value={{ gradient, view, setView, gradientType, setGradientType, degree, setDegree, generateGradient, colours, setColours, theme, setTheme }}>
            {children}
        </ViewContext.Provider>
    )
}

export { ViewContext, ViewProvider };