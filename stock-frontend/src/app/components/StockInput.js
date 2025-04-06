'use client'
import { useState } from "react";

export default function StockInput({ onValidSymbol }) {
    const [symbol, setSymbol] = useState("");
    const [resposne, setResposne] = useState("");

    const handleGoClick = async () => {
        if (!symbol) {
            alert("Please enter a stock symbol");
            return;
        }

        console.log(`Stock symbol [${symbol}] sent to backend`);

        try {
            const res =  await fetch(`http://localhost:5000/api/check_stock?symbol=${encodeURIComponent(symbol)}`);

            if (!res.ok) {
                throw new Error(`Server returned status ${res.status}`);
            }

            const data = await res.json();
            console.log(`Backend response: ${data.symbol}: ${data.isValid}`);

            if (data.isValid) {
                onValidSymbol(data.symbol);         // Set the symbol of the parent to valid
                console.log("Valid Stock Symbol")
            }else {
                onValidSymbol("");                  // Invalid stock, empty string == False
                console.log("Invalid Stock");
            }

        }
        catch (error){
            if (error.message == "Failed to fetch") {                   // When front can't communicate with back(AKA back is offline)
                console.error("Could not communicate with backend");
            }else {                                                     // When back is online but error occurred
                console.error("Fetch failed:", error.message)
            }
            console.error("Stack trace:", error.stack);      
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
                className="ml-2"
            >Go</button>
        </div>
    )
}