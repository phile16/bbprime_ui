import React, { useState } from 'react';
import PropTypes from 'prop-types';

const HoverTracker = ({ onHoverEnd, children, pageName, user, controlId }) => {
    const [hoverStart, setHoverStart] = useState(null);
    const handleMouseEnter = () => {
        setHoverStart(Date.now());
    };
    const handleMouseLeave = async () => {
        if (hoverStart) {
            const duration = Date.now() - hoverStart;
            setHoverStart(null);
            // Send hover duration to backend
            try {
                await fetch('http://localhost:5555/api/hover', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ pageName, user, controlId, duration })
                });
            } catch (error) {
                console.error('Failed to send hover data:', error);
            }
            if (onHoverEnd) {
                onHoverEnd(duration);
            }
        }
    };
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
        </div>
    );
};
HoverTracker.propTypes = {
    onHoverEnd: PropTypes.func,
    children: PropTypes.node.isRequired
};

export default HoverTracker;
