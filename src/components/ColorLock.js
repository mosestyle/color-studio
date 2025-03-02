import React from 'react';
import { getReadableTextColor } from '../utils/contrastUtils';

const ColorLock = ({ color, isLocked, onToggle }) => {
  const textColor = getReadableTextColor(color);
  
  return (
    <button 
      className={`color-lock ${isLocked ? 'locked' : 'unlocked'}`}
      onClick={onToggle}
      style={{ 
        color: textColor,
        backgroundColor: `${color}80` // 50% transparent background
      }}
      aria-label={isLocked ? "Unlock color" : "Lock color"}
    >
      <span className="lock-icon">
        {isLocked ? '🔒' : '🔓'}
      </span>
    </button>
  );
};

export default ColorLock;