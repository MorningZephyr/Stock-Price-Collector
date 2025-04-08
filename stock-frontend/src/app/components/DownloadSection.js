'use client'

import Button from "./Button";

export default function DownloadSection({ symbol, period, interval }) {
    
    const handleDownloadClick = () => {
        
        try {

            // Extra safeguarding
            if (!symbol || !period || !interval) {
                alert("Please fill out all fields before downloading.");
                return;
            }

            const url =
                "http://localhost:5000/api/download_data" +
                `?symbol=${encodeURIComponent(symbol)}` +
                `&period=${period}` +
                `&interval=${interval}`;

            console.log("Download URL:", url);

            window.open(url, "_blank");

        }
        catch (err) {

            console.error("Download failed:", err);

        }
        
    }

    return (

        <div className="pt-5 pb-5">
            <Button
            label="Download"
            variant="download"
            onClick={handleDownloadClick}
            />
        </div>
    
    )
    
}
