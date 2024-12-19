import React, { useEffect, useState } from 'react';

// TimeOnPageTracker Component
export const TimeOnPageTracker = ({ onTimeTracked, pageName, user }) => {
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        const handleUnload = async () => {
            const endTime = Date.now();
            const timeOnPage = endTime - startTime;

            // Trigger the callback to send time data
            if (onTimeTracked) {
                onTimeTracked(timeOnPage);
            }

            console.log(JSON.stringify({ pageName, user, timeOnPage }));
            // Send the data directly to a backend API
           
            try {
                await fetch('http://localhost:5555/api/timeonpage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ pageName, user, timeOnPage })
                });
            } catch (error) {
                console.error('Failed to send TimeOnPageTracker data:', error);
            }
        };

        // Register the event
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            // Cleanup the event listener
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [startTime, onTimeTracked]);

    return null; // This component does not render anything
};


export default TimeOnPageTracker;