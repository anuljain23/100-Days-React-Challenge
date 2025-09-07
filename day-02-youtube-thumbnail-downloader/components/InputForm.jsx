export default function InputForm({ url, setUrl, onGenerate }) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
                type="text"
                placeholder="Paste YouTube video URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-700 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-gray-800"
            />
            <button
                onClick={onGenerate}
                className="cursor-pointer px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow transition"
            >
                Generate
            </button>
        </div>
    );
}
