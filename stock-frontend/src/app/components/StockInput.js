'use client'
import { useState } from "react";

export default function StockInput({ onValidSymbol }) {
    const [symbol, setSymbol] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGoClick = async () => {
        if (!symbol) {
            alert("Please enter a stock symbol");
            return;
        }

        if (isLoading) return;          // Prevent users from spamming when request still processing
        setIsLoading(true);             // Disable the Go button when recieving a request

        console.log(`Stock symbol [${symbol}] sent to backend`);

        try {
            const res =  await fetch(`http://localhost:5000/api/check_stock?symbol=${encodeURIComponent(symbol)}`);

            if (!res.ok) {
                throw new Error(`Server returned status ${res.status}`);
            }
            
            const data = await res.json();

            if (data.isValid) {
                onValidSymbol(data.symbol);         // Set the symbol of the parent to valid
                console.log(`Backend response: [${data.symbol}] is a [valid] stock symbol`);
            }else {
                onValidSymbol("");                  // Invalid stock, empty string == False
                console.log(`Backend response: [${data.symbol}] is an [invalid] stock symbol`);
            }

        }
        catch (error){
            if (error.message == "Failed to fetch") {                   // When front can't communicate with back(AKA back is offline)
                console.error("Could not communicate with backend");
            }else {                                                     // When back is online but error occurred
                console.error("Fetch failed:", error.message)
            }
            console.error("Stack trace:", error.stack);      
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a stock ticker symbol"
                value = {symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="p-2"
            />

            <button
                onClick={handleGoClick}
                className={`m-2 px-4 py-2 font-semibold rounded-lg 
                    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"}`}
            >{isLoading ? "Loading..." : "Go"}</button> 
        </div>
    )
}