import React, { useState } from 'react';
import { getTextColor } from '../utils/colorUtils';

const ColorPanel = ({ color, colorName }) => {
  const [copied, setCopied] = useState(false);
  const textColor = getTextColor(color);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  return (
    <div className="color-panel">
      <button
        className="copy-button"
        onClick={copyToClipboard}
        style={{ color: textColor }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      
      <div className="color-info" style={{ color: textColor }}>
        <div className="color-hex">{color}</div>
        <div className="color-name">{colorName}</div>
      </div>
    </div>
  );
};

export default ColorPanel;