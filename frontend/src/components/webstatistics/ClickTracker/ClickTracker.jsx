import React, { useEffect } from 'react';

export const ClickTracker = ({ onClickTracked, pageName, user }) => {
    useEffect(() => {
        const handleClick = (event) => {
            // Extract relevant details from the click event
            const clickData = {
                element: event.target.tagName, // e.g., 'BUTTON', 'DIV'
                timestamp: Date.now(),        // Current time in ms
                x: event.clientX,             // X-coordinate of the click
                y: event.clientY,             // Y-coordinate of the click
                id: event.target.id || null,  // Element ID if available
                className: event.target.className || null, // Element class if available
                pageName: pageName,
                user: user
            };
            // Trigger the callback to pass click data to the parent
            if (onClickTracked) {
                onClickTracked(clickData);
            }
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
    return null; // This component does not render anything
};


export default ClickTracker;