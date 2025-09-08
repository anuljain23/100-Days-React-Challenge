import { Palette, User } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { themeOptions } from '../dataStore/data'

const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <header className='bg-black/10 backdrop-blur-md shadow-lg p-6 lg:py-6 lg:px-20 flex justify-between items-center border-b border-white/10'>
            <h1 className='flex text-2xl md:text-4xl font-bold gap-2 items-center'>
                <User className='text-indigo-500 w-8 h-8 md:w-10 md:h-10' /> Avatar Generator
            </h1>
            <div className='flex items-center gap-3'>
                <Palette className='text-indigo-500 w-8 h-8 md:w-10 md:h-10' />
                <select
                    className={`rounded-lg p-2 text-md md:text-lg ${theme.select} cursor-pointer`}
                    value={theme.name}
                    onChange={(e) => (
                        setTheme(themeOptions.find((t) => t.name === e.target.value) || themeOptions[0])
                    )}
                >
                    {themeOptions.map((t) => {
                        return (
                            <option key={t.name} value={t.name}>{t.name}</option>
                        )
                    })}
                </select>
            </div>
        </header>
    )
}

export default Navbar