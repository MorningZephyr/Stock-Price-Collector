'use client';
import { useState } from "react";
import StockInput from "./components/StockInput";

function DisplayPeriod({ period, setPeriod }) {
  const validPeriods = [
    "1d", "5d", "1mo", "3mo", "6mo",
    "1y", "2y", "5y", "10y", "ytd", "max"
  ];

  return (
    <div>
      <label>Select Period: </label>
      <select 
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      >
        <option value="">-- Select Period --</option>
        {validPeriods.map((p) => (<option value={p}>{p}</option>))}



      </select>
    </div>
  )

}

export default function Home() {

  const [validSymbol, setValidSymbol] = useState("");

  return (
    <main>
      <StockInput onValidSymbol={setValidSymbol}/>

      {validSymbol && <DisplayPeriod />}

    </main>
  )

}