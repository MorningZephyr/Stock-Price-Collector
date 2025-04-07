'use client'

import Button from "./Button";

export default function DisplayInterval() {
    const intervals = ["1m", "5m", "1d"];

    return (
        <div className="mt-4">
            <label>Select Interval: </label>

            <div>{intervals.map((i) => (
                            <Button
                                key={i}                                 // jsx, need {} to embed js
                                label={i}                               // jsx, need {} to embed js
                            />
                        ))}</div>
        </div>
    )

}