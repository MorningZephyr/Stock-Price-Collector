'use client';

import { useState } from "react";

export default function Home() {

  // Setting a symbol state for the user
  const [symbol, setSymbol] = useState("");
  // Checking if the symbol is valid or not
  const [symbolValidity, setSymbolValidity] = useState(null)

  // Handles when the user click a request to the backend
  const handleGoClick = async () => {
    if (!symbol) {
      alert("Please enter a stock symbol");
      return 
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
      <p>Current input: {symbol}</p>
    </div>
  )
    


}