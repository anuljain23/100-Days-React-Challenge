import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('adventurer')
    const [avatarUrl, setAvatarUrl] = useState('')

    const generateAvatar = () => {
        const seed = Math.random().toString(36).substring(7);
        const url = `https://api.dicebear.com/7.x/${selectedCategory}/svg?seed=${seed}`;
        setAvatarUrl(url);
    }

    useEffect(() => {
        generateAvatar()
    }, [selectedCategory])

    return (
        <DataContext.Provider value={{ selectedCategory, setSelectedCategory, avatarUrl, generateAvatar }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }