'use client';

export default function Button({ label, onClick, isSelected = false, variant = "default" }) {
    
    const baseStyle = //"w-18 h-10 px-2 py-1 rounded-md font-medium cursor-pointer shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95";
                    "w-18 h-12 px-4 py-2 rounded-md font-medium cursor-pointer shadow-sm transition-transform duration-150 ease-in-out transform hover:scale-102 active:scale-98";
    const variants = {

        "default" : isSelected
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-blue-500 hover:opacity-90 shadow-sm"
        : "bg-white/80 text-gray-800 border border-gray-300 hover:bg-blue-100 backdrop-blur-md shadow-sm",

        "download": "w-30 h-12 bg-green-600 text-white hover:bg-green-700 border border-green-600",
        
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]}`}
        >{label}</button>

    )
}

