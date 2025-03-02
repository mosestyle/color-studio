import React, { useState } from 'react';
import { generateShades, getTextColor } from '../utils/colorUtils';

const ColorShades = ({ baseColor }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const shades = generateShades(baseColor, 9);
  
  const copyToClipboard = (shade, index) => {
    navigator.clipboard.writeText(shade);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };
  
  return (
    <div className="color-shades">
      <div className="shades-title">Shades</div>
      <div className="shades-grid">
        {shades.map((shade, index) => (
          <button
            key={index}
            className="shade-box"
            style={{ 
              backgroundColor: shade,
              color: getTextColor(shade)
            }}
            onClick={() => copyToClipboard(shade, index)}
          >
            {copiedIndex === index ? (
              <span className="copied-message">Copied!</span>
            ) : (
              <span className="shade-value">{shade}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorShades;