import { motion } from "framer-motion";
import ThumbnailCard from "./ThumbnailCard";

export default function ThumbnailGrid({ thumbnails }) {
    return (
        <motion.div
            className="w-full max-w-5xl bg-gray-800 text-gray-100 rounded-3xl shadow-lg p-6 sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {thumbnails.map((thumb, i) => (
                    <ThumbnailCard key={i} thumb={thumb} delay={i * 0.1} />
                ))}
            </div>
        </motion.div>
    );
}
