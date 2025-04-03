'use client';

import { useState } from "react";

export default function Home() {

  const [symbol, setSymbol] = useState("");
  const [response, setResponse] = useState("");

  // Handles when the user click a request to the backend
  const handleGoClick = async () => {
    if (!symbol) {
      alert("Please enter a stock symbol");
      return;
    }

    console.log("Stock symbol entered: ", symbol);
    

    try {
      const res = await fetch(`http://localhost:5000/api/check_stock?symbol=${encodeURIComponent(symbol)}`);
      const data = await res.json();

      if (data.error) {alert(data.error);}
      else {setResponse('Stock symbol: ${data.symbol} is ${data.valid ? "Valid": "Invalid"}')}

    }
    catch (error){
      console.error("Error trying to call backend", error);
      setResponse("An error has occurred while checking stock symbol. Please try again");
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

      <p>Current input: {symbol}</p>
    </div>
  )
    
}