'use client';

import { useState } from "react";

export default function Home() {

  // Setting a symbol state for the user
  const [symbol, setSymbol] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold">Stock Price Collector</h1>
      <input
        type="text"                                         // specifies text input
        placeholder="Enter a stock ticker symbol"           // what the user sees in the box
        value={symbol}                                      // binds symbol to the input
        onChange={(e) => setSymbol(e.target.value)}                                        
      
      
      
      
      
      />
    </div>
  )
    


}