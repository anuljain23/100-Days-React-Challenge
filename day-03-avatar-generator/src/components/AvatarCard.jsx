import { motion } from 'framer-motion'
import { Download, Shuffle } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { DataContext } from '../context/dataContext'

const AvatarCard = () => {
    const { theme } = useContext(ThemeContext)
    const { avatarUrl, generateAvatar } = useContext(DataContext)
    return (
        <section className='flex-1 flex flex-col items-center lg:justify-center'>
            <motion.div
                className={`w-full p-8 max-w-lg shadow-2xl rounded-3xl flex flex-col items-center border ${theme.card}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {avatarUrl ? (
                    <img src={avatarUrl} alt="Generated Avatarvatar" className={`w-44 h-44 rounded-full object-contain border-[1px] border-dashed border-indigo-500 shadow-lg mb-6 ${theme.avatarContainer}`} />
                ) : (
                    <div
                        className={`w-44 h-44 rounded-full border-[1px] border-dashed border-gray-600 flex items-center justify-center mb-6 ${theme.avatarContainer}`}
                    >
                        No Avatar Yet
                    </div>
                )}
                <div className='flex gap-4'>
                    <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition font-medium shadow-md ${theme.button} cursor-pointer`}
                        onClick={generateAvatar}
                    >
                        <Shuffle size={18} /> Generate
                    </button>
                    {avatarUrl && (
                        <a href={avatarUrl} target='_blank' className={`flex items-center gap-2 px-6 py-3 rounded-xl transition font-medium shadow-md bg-green-600 hover:bg-green-700 text-white`}>
                            <Download size={18} /> Download
                        </a>
                    )}
                </div>
            </motion.div>
        </section>
    )
}

export default AvatarCard