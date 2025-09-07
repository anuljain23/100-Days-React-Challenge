import { motion } from "framer-motion";
import { Download, ImageOff } from "lucide-react";
import { useState } from "react";

export default function ThumbnailCard({ thumb, delay }) {
    const [error, setError] = useState(false);

    return (
        <motion.div
            className="bg-gray-700 rounded-2xl p-4 shadow border border-gray-600 flex flex-col items-center text-center h-80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay }}
        >
            <p className="font-semibold text-gray-100 mb-2">{thumb.label}</p>

            <div className="flex-1 flex items-center justify-center w-full">
                {!error ? (
                    <img
                        src={thumb.url}
                        alt={thumb.label}
                        className="w-full h-40 object-cover rounded-lg shadow-md border border-gray-600"
                        onError={() => setError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <ImageOff size={40} className="mb-2" />
                        <p className="text-sm">Thumbnail not available</p>
                    </div>
                )}
            </div>

            {!error && (
                <a
                    href={thumb.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition w-full"
                >
                    <Download size={18} /> Download
                </a>
            )}
        </motion.div>
    );
}
