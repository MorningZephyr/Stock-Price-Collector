'use client';

import { useState } from "react";

export default function Home() {

  const [symbol, setSymbol] = useState("");
  const [response, setResponse] = useState("");

  // Handles when the user click a request to the backend
  const handleGoClick = async () => {
    if (!symbol) {
      alert("Please enter a stock symbol");

      // Prevent the function from running the bottom 
      return;
    }

    console.log("Stock symbol sent to backend: ", symbol);
    

    try {
      const res = await fetch(`http://localhost:5000/api/check_stock?symbol=${encodeURIComponent(symbol)}`);
      
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      
      
      const data = await res.json();

      console.log(`Backend response: ${data.symbol}: ${data.isValid}`)
      setResponse(`You entered ${data.symbol} and its status is ${data.isValid ? "valid": "invalid"}`)
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
      <h1 className="text-4xl font-bold">Stock Price Collector</h1>

      <input
        type="text"                                         // specifies text input
        placeholder="Enter a stock ticker symbol"           // what the user sees in the box
        value={symbol}                                      // binds symbol to the input
        onChange={(e) => setSymbol(e.target.value)}         // set symbol to user input                              

        className="p-2"
      />

      <button 
        onClick={handleGoClick}
        className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >Go
      </button>

      <p>{response}</p>
    </div>
  )
    
}