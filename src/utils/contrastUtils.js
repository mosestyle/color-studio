// src/utils/contrastUtils.js

/**
 * Calculates the relative luminance of a color as per WCAG 2.0
 * @param {string} hexColor - Hex color code
 * @returns {number} - Relative luminance value
 */
export const getLuminance = (hexColor) => {
  // Remove the hash if it exists
  const hex = hexColor.replace('#', '');
  
  // Parse the RGB values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Calculate the luminance according to WCAG 2.0
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Calculates the contrast ratio between two colors as per WCAG 2.0
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} - Contrast ratio
 */
export const getContrastRatio = (color1, color2) => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  // Ensure the lighter color is the first one
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  // Calculate the contrast ratio
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Determines if a text color has sufficient contrast against a background
 * @param {string} textColor - Hex color code of the text
 * @param {string} bgColor - Hex color code of the background
 * @param {string} level - WCAG compliance level ('AA' or 'AAA')
 * @param {boolean} isLargeText - Whether the text is considered large
 * @returns {boolean} - Whether the contrast is sufficient
 */
export const hasEnoughContrast = (textColor, bgColor, level = 'AA', isLargeText = false) => {
  const ratio = getContrastRatio(textColor, bgColor);
  
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  
  // AA level
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

/**
 * Gets the most readable text color (black or white) for a background
 * @param {string} bgColor - Hex color code of the background
 * @returns {string} - '#FFFFFF' or '#000000'
 */
export const getReadableTextColor = (bgColor) => {
  const whiteContrast = getContrastRatio(bgColor, '#FFFFFF');
  const blackContrast = getContrastRatio(bgColor, '#000000');
  
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
};