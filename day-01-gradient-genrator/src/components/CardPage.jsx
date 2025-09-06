import { useContext, useEffect } from 'react'
import { ViewContext } from '../context/ViewContext'
import { FaShuffle } from "react-icons/fa6";

const CardPage = () => {
    const { gradientType, gradient, degree, setDegree, generateGradient } = useContext(ViewContext)

    useEffect(() => {
        if (!gradient)
            generateGradient()
    }, [gradientType])
    return (
        <div className='flex flex-col justify-center items-center min-h-[80vh] p-8'>
            <div className='w-96 h-56 shadow-lg mb-6 rounded-2xl' style={{ background: gradient }}>
            </div>
            {gradientType === 'linear-gradient' && (
                <div className='flex items-center gap-4 mb-4'>
                    <label>Angle: </label>
                    <input type="range" min='0' max='360' value={degree} className='w-48'
                        onChange={(e) => {
                            setDegree(e.target.value)
                        }}
                    />
                    <span>{degree}°</span>
                </div>
            )}
            <button onClick={generateGradient} className='flex items-center gap-2 cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700'>
                <FaShuffle /> Generate Gradient</button>
            <pre title="Click to copy"
                onClick={() => navigator.clipboard.writeText(gradient)}
                className="cursor-pointer mt-4 p-4 bg-white hover:bg-white/120 rounded-md shadow text-sm text-gray-700">
                {gradient}
            </pre>
        </div>
    )
}

export default CardPage