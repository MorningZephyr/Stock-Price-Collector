'use client'

import Button from "./Button";

export default function DisplayInterval({ period, interval, onSelectedInterval }) {
    const intervals = ["1m","2m","5m","15m","30m","60m","90m","1h",     // intraday
                        "1d","5d","1wk","1mo","3mo"]                    // interday

    return (
        <div className="mt-4">
            <label>Select Interval: </label>

            <div>{intervals.map((i) => (
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