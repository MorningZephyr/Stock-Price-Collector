'use client';
import { useState } from "react";
import StockInput from "./components/StockInput";
import DisplayPeriod from "./components/DisplayPeriod";

export default function Home() {

  const [validSymbol, setValidSymbol] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <header>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Stock Price Collector
        </h1>
      </header>
      

      <StockInput onValidSymbol={setValidSymbol}/>
      <DisplayPeriod/>
      {/**Only show the DisplayPeriod when user enters valid stock symbol */}
      {validSymbol && <DisplayPeriod onSelectedPeriod={setSelectedPeriod}/>}
      

      {/**Display the selected Period */}
      <p>Selected Period: {selectedPeriod}</p>

    </main>
  )

}