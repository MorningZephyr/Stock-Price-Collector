'use client'
import { useState } from "react";

export default function({ onSelectedPeriod }) {
    const validPeriods = [
        "1d", "5d", "1mo", "3mo", "6mo",
        "1y", "2y", "5y", "10y", "ytd", "max"
    ];

    return (
        <div>

            <label>Select Period</label>

            {/**Updates the value of period when user selects */}
            <select onChange={(e) => onSelectedPeriod(e.target.value)}>

                <option key="default" value="">-- Select Period --</option>
                {validPeriods.map((p) => (<option key={p} value={p}>{p}</option>))}

            </select>
            
        </div>
    );
}