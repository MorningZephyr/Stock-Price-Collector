'use client'

import Button from "./Button";

export default function DisplayInterval({ period, interval, onSelectedInterval }) {
                       
    const intervalMap = {
        "1d": ["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1d"],
        "5d": ["1m","2m","5m","15m","30m","60m","90m","1h","1d","5d"],
        "1mo": ["5m","15m","30m","60m","90m","1h","1d","5d","1wk","1mo"],
        "3mo": ["1h","1d","5d","1wk","1mo","3mo"],
        "6mo": ["1h","1d","5d","1wk","1mo","3mo"],
        "1y": ["1h","1d","5d","1wk","1mo","3mo"],
        "2y": ["1h","1d","5d","1wk","1mo","3mo"],
        "5y": ["1d","5d","1wk","1mo","3mo"],
        "10y": ["1d","5d","1wk","1mo","3mo"],
        "ytd": ["1d","5d","1wk","1mo","3mo"],
        "max": ["1mo","3mo"]
    };

    const validIntervalSet = intervalMap[period];

    return (
        <div className="flex flex-wrap gap-2  max-w-md">
            
            <label className="text-lg font-semibold text-blue-600 mb-2">
            Select Interval
            </label>

            <div>{validIntervalSet.map((i) => (
                            <Button
                                key={i}                                 // jsx, need {} to embed js
                                label={i}                               // jsx, need {} to embed js
                                onClick={()=> onSelectedInterval(i)}
                                isSelected = {interval === i}
                            />
                        ))}</div>
        </div>
    )

}