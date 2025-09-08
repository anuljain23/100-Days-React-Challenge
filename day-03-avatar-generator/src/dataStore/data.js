const categoryOptions = [
    { name: "Adventurer", value: "adventurer" },
    { name: "Bottts", value: "bottts" },
    { name: "Pixel Art", value: "pixel-art" },
    { name: "Avataaars", value: "avataaars" },
    { name: "Shapes", value: "shapes" },
    { name: "Croodles", value: "croodles" },
    { name: "Micah", value: "micah" },
    { name: "Fun Emoji", value: "fun-emoji" },
    { name: "Identicon", value: "identicon" },
    { name: "Lorelei", value: "lorelei" },
];

// Light and Dark theme options with gradient backgrounds
const themeOptions = [
    {
        name: "Light",
        gradient: "from-gray-50 via-gray-100 to-gray-200",
        card: "bg-white border-gray-300",
        button: "bg-indigo-600 hover:bg-indigo-700 !text-white",
        categoryDefault: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        categoryActive: "bg-indigo-600 hover:bg-indigo-700 text-white",
        text: "text-gray-900",
        select: "bg-white text-gray-900 border-gray-300",
        avatarContainer: "bg-gray-100",
    },
    {
        name: "Dark",
        gradient: "from-gray-950 via-gray-900 to-gray-800",
        card: "bg-gray-900 border-gray-700",
        button: "bg-indigo-600 hover:bg-indigo-700 !text-white",
        categoryDefault: "bg-gray-800 hover:bg-gray-700 text-gray-300",
        categoryActive: "bg-indigo-600 hover:bg-indigo-700 text-white",
        text: "text-gray-100",
        select: "bg-gray-800 text-gray-200 border-gray-700",
        avatarContainer: "bg-gray-800",
    },
];

export { categoryOptions, themeOptions }