import React, { useState } from 'react';
import HoverTracker from '../HoverTracker/HoverTracker';

const HoverAnalyticsDisplay = () => {
    const [hoverData, setHoverData] = useState([]);
    const handleHoverEnd = (duration) => {
        setHoverData([...hoverData, duration]);
    };
    const getAverageHoverTime = () => {
        if (hoverData.length === 0) return 0;
        const total = hoverData.reduce((sum, time) => sum + time, 0);
        return (total / hoverData.length).toFixed(2);
    };
    return (
        <div>
            <h2>Hover Analytics</h2>
            <HoverTracker onHoverEnd={handleHoverEnd}>
                <div style={{ padding: '20px', border: '1px solid black' }}>
                    Hover over me to track time!
                </div>
            </HoverTracker>
            <h3>Hover Records:</h3>
            <ul>
                {hoverData.map((time, index) => (
                    <li key={index}>Hover Time: {time}ms</li>
                ))}
            </ul>
            <h4>Average Hover Time: {getAverageHoverTime()}ms</h4>
        </div>
    );
};

export default HoverAnalyticsDisplay;
