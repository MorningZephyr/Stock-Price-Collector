'use client'

import Button from "./Button";

export default function DownloadSection({ symbol, period, interval }) {
    
    const handleDownloadClick = async () => {
        
        try {
            //const res =  await fetch(`http://localhost:5000/api/check_stock?symbol=${encodeURIComponent(symbol)}`);


        }
        catch {

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
