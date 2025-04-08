'use client'

import Button from "./Button";

export default function DisplayPeriod({ period, onSelectedPeriod, resetInterval }) {
    const validPeriods = [
        "1d", "5d", "1mo", "3mo", "6mo",
        "1y", "2y", "5y", "10y", "ytd", "max"
    ];

    return (

        <div>

            <label>Select Period: </label>

            <div>{validPeriods.map((p) => (
                <Button
                    key={p}                                 // jsx, need {} to embed js
                    label={p}                               // jsx, need {} to embed js
                    onClick={() => {
                        onSelectedPeriod(p);
                        resetInterval("");                  // reset the interval selection
                    }}
                    isSelected={period === p}               // let user know they selected this button
                />
            ))}</div>
            
        </div>

    );
    
}