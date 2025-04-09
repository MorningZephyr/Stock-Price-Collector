'use client';
import { useState, useEffect } from "react";
import StockInput from "./components/StockInput";
import DisplayPeriod from "./components/DisplayPeriod";
import DisplayInterval from "./components/DisplayInterval";
import DownloadSection from "./components/DownloadSection";
import { BACKEND_URL } from "./lib/constants";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {

  const [validSymbol, setValidSymbol] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("");

  const [backendReady, setBackendReady] = useState(false); 

  // Immediately send request to backend to wake it up
  useEffect(() => {
    fetch(`${BACKEND_URL}/`)
      .then(res => res.text())
      .then(data => console.log("Backend pinged:", data))
      .then(() => setBackendReady(true))
      .catch(err => console.error("Backend not reachable:", err));
  
      return () => clearTimeout(timer);

  }, []); 

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">


      <header className="mb-2">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Stock Price Collector
        </h1>
      </header>


      <div className="mt-6 flex gap-2">


        <a
          href="https://github.com/MorningZephyr/Stock-Price-Collector"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mr-5"
        >
          🔗 Source Code
        </a>


        <p className="text-sm font-semibold text-gray-700 mb-2">Find me on:</p>
        <a
          href="https://github.com/MorningZephyr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black"
        >
          <FaGithub size={24} />
        </a>


        <a
          href="https://www.linkedin.com/in/zhen-tao-pan-4045a52a0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={24} />
        </a>


      </div>


      <StockInput 
        onValidSymbol={setValidSymbol} 
        resetPeriod={setSelectedPeriod}
        resetInterval={setSelectedInterval}
        resetSymbol = {setValidSymbol}
      />


      {!backendReady && <p className="text-gray-500">Waking up backend...</p>}


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

      {/**Only show download button after user selected interval*/}
      {selectedInterval &&

        <DownloadSection
          symbol={validSymbol}
          period={selectedPeriod}
          interval={selectedInterval}
        />

      }


    </main>
  )

}