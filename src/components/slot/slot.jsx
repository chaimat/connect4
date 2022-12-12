import React from 'react';
import './slot.css';

const Slot = ({x, y, value, id, coinPlayed}) => {
    return (
        <div 
            className={`board-slot board-slot-${value}`} 
            onClick={() => coinPlayed(x, y)}/>
    )
}

export default Slot;