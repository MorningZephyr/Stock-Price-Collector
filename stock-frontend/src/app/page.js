'use client';
import { useState } from "react";
import StockInput from "./components/StockInput";
import DisplayPeriod from "./components/DisplayPeriod";

export default function Home() {

  const [validSymbol, setValidSymbol] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  return (
    <main>
      <StockInput onValidSymbol={setValidSymbol}/>
      <DisplayPeriod onSelectedPeriod={setSelectedPeriod}/>

      <p>Selected Period: {selectedPeriod}</p>

    </main>
  )

}