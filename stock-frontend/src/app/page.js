'use client';
import { useState } from "react";
import StockInput from "./components/StockInput";
import DisplayPeriod from "./components/DisplayPeriod";
import DisplayInterval from "./components/DisplayInterval";

export default function Home() {

  const [validSymbol, setValidSymbol] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">


      <header>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Stock Price Collector
        </h1>
      </header>
      

      <StockInput onValidSymbol={setValidSymbol}/>


      {/**Only show the period options after user inputted a valid stock symbol*/}
      {validSymbol &&

        <DisplayPeriod 
          period={selectedPeriod} 
          onSelectedPeriod={setSelectedPeriod} 
          resetInterval={setSelectedInterval}
        />

      }


      {/**Only show the interval options after user selected a period */}
      {selectedPeriod && 
        
        <DisplayInterval 
          period={selectedPeriod} 
          interval={selectedInterval} 
          onSelectedInterval={setSelectedInterval}
        />
      
      }

      
      {/**Display the selected Period */}
      <p>Selected Period: {selectedPeriod}</p>

      {/**Display the selected Interval */}
      <p>Selected Interval: {selectedInterval}</p>


    </main>
  )

}