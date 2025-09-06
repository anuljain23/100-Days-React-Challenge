import { useContext } from 'react'
import { ViewContext } from '../context/ViewContext'

const NavBar = () => {
    const { view, setView, gradientType, setGradientType, gradient } = useContext(ViewContext)
    return (
        <>
            <nav className='w-full py-4 px-20 bg-white items-center flex justify-between shadow sticky top-0 z-10'>
                <h1 className='text-3xl font-semibold cursor-pointer text-transparent bg-clip-text' style={{ backgroundImage: gradient }} onClick={() => {
                    if (view !== 'card') {
                        setView('card')
                    }
                }}>
                    Gradient Genrator</h1>
                <div className='flex gap-6 align-centre'>
                    <div className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer">
                        <button onClick={() => setGradientType("linear-gradient")}
                            className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium transition ${gradientType === "linear-gradient"
                                ? "bg-blue-600 text-white shadow hover:bg-blue-700"
                                : "text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Linear
                        </button>
                        <button onClick={() => setGradientType("radial-gradient")}
                            className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium transition ${gradientType === "radial-gradient"
                                ? "bg-blue-600 text-white shadow hover:bg-blue-700"
                                : "text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Radial
                        </button>
                    </div>
                    <button onClick={() => {
                        setView('card')
                    }} className={`px-4 py-2 rounded-xl ${view === 'card' ? 'bg-blue-600 text-white hover:bg-blue-700 transition' : 'bg-gray-200 hover:bg-gray-300 transition'} cursor-pointer`}>Card</button>
                    <button onClick={() => {
                        setView('fullscreen')
                    }} className={`px-4 py-2 rounded-xl ${view === 'fullscreen' ? 'bg-blue-600 text-white hover:bg-blue-700 transition' : 'bg-gray-200 hover:bg-gray-300 transition'} cursor-pointer`}>Fullscreen</button>
                </div>
            </nav>
        </>
    )
}

export default NavBar