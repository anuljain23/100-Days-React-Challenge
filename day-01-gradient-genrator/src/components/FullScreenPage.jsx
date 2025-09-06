import { useContext } from "react";
import { FaShuffle } from "react-icons/fa6";
import { ViewContext } from "../context/ViewContext";

const FullScreenPage = () => {
    const { gradient, generateGradient, gradientType, degree, setDegree } = useContext(ViewContext)
    return (
        <div className="w-screen h-[80vh] flex flex-col justify-center items-center relative text-white" style={{ background: gradient }}>
            <div className="absolute top-6 right-6">
                <button onClick={generateGradient} className="text-xs flex items-center gap-2 rounded py-2 px-4 cursor-pointer bg-black/50 hover:bg-black/70">
                    <FaShuffle /> New Gradient
                </button>
            </div>
            {/* <div className="bg-black/50 px-12 py-6 rounded-4xl flex flex-col justify-center items-center"> */}
            <h1 className="text-4xl drop-shadow-lg font-bold mb-4">Random Gradient</h1>
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
            <p className="text-lg drop-shadow">{gradient}</p>
            {/* </div> */}
        </div>
    )
}

export default FullScreenPage