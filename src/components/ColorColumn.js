import React, { useState } from 'react';
import ColorLock from './ColorLock';
import ColorPanel from './ColorPanel';
import ColorShades from './ColorShades';
import { getColorName } from '../utils/colorUtils';

const ColorColumn = ({ color, isLocked, onToggleLock, index }) => {
  const [showShades, setShowShades] = useState(false);
  const colorName = getColorName(color);
  
  return (
    <div 
      className="color-column"
      style={{ backgroundColor: color }}
      onMouseEnter={() => setShowShades(true)}
      onMouseLeave={() => setShowShades(false)}
    >
      <div className="column-top">
        <ColorLock 
          color={color} 
          isLocked={isLocked} 
          onToggle={onToggleLock} 
        />
      </div>
      
      <div className="column-content">
        {showShades && (
          <ColorShades baseColor={color} />
        )}
      </div>
      
      <div className="column-bottom">
        <ColorPanel color={color} colorName={colorName} />
      </div>
    </div>
  );
};

export default ColorColumn;