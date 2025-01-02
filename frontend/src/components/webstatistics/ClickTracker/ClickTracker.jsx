import React, { useEffect } from 'react';


/*
Make sure anything we want to tracked has an ID
was trying to take a global approach to this but this currently tracks the lowest element
Add ID to every element that needs to be tracked, make sure to use a naming scheme for easy rollup
*/


export const ClickTracker = ({ onClickTracked, pageName, user, pid }) => {
    useEffect(() => {
        const handleClick = (event) => {
            // Extract details from the click event
            const clickData = {
                element: event.target.tagName,
                timestamp: Date.now(),
                x: event.clientX,
                y: event.clientY,
                id: event.target.id || null,
                className: event.target.className || null,
                pageName: pageName,
                user: user,
                pid: pid // prolific ID
            };
            // Trigger the callback to pass click data to the parent
            // Maybe add logic here with element property to track
            if (onClickTracked) {
                onClickTracked(clickData);
            }
            // Save to mongo
            // remove this hard coded URL
            fetch('http://localhost:5555/api/clicks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clickData),
            }).catch((err) => console.error('Failed to send click data:', err));
        };
        // Add click event listener
        document.addEventListener('click', handleClick);
        return () => {
            // Cleanup event listener on component unmount
            document.removeEventListener('click', handleClick);
        };
    }, [onClickTracked]);
    return null;
};


export default ClickTracker;