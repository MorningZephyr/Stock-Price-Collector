'use client';

export default function Button({ label, onClick, isSelected = false }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md border font-medium
                ${isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                } 
                
            `}
        >{label}</button>

    )
}

