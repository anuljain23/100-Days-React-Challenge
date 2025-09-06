import React, { useContext, useEffect, useState } from 'react'
import { ViewContext } from '../context/ViewContext'

const CardPage = () => {
    const [gradient, setGradient] = useState('')
    const { gradientType } = useContext(ViewContext)
    const [degree, setDegree] = useState('90')
    const generateGradient = () => {
        const baseColour = 255 * 255 * 255
        const colours = [
            `#${(Math.floor(Math.random() * baseColour).toString(16)).padStart(6, 0)}`,
            `#${(Math.floor(Math.random() * baseColour).toString(16)).padStart(6, 0)}`
        ]
        if (gradientType === 'linear-gradient') {
            setGradient(`${gradientType}(${degree}deg, ${colours[0]}, ${colours[1]})`)
        } else {
            setGradient(`${gradientType}(circle, ${colours[0]}, ${colours[1]})`)
        }
    }
    useEffect(() => {
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
            <button onClick={generateGradient} className='cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700'>🎲 Generate Gradient</button>
            <pre className="mt-4 p-4 bg-white rounded-md shadow text-sm text-gray-700">
                {gradient}
            </pre>
        </div>
    )
}

export default CardPage