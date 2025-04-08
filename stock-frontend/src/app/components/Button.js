'use client';

export default function Button({ label, onClick, isSelected = false, variant = "default" }) {
    
    const baseStyle = "px-4 py-2 rounded-md border font-medium cursor-pointer";

    const variants = {

        "default" : isSelected
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100",

        "download": "bg-green-600 text-white hover:bg-green-700 border border-green-600",
        
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]}`}
        >{label}</button>

    )
}

