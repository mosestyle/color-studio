/**
 * Generates a random hex color
 * @returns {string} - Random hex color
 */
export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Determines if a color is dark
 * @param {string} hexColor - Hex color code
 * @returns {boolean} - True if color is dark
 */
export const isColorDark = (hexColor) => {
  // Remove the hash if it exists
  const hex = hexColor.replace('#', '');
  
  // Parse the RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if the color is dark
  return luminance < 0.5;
};

/**
 * Generates a text color based on the background color
 * @param {string} backgroundColor - Hex color code of background
 * @returns {string} - Either white or black, depending on contrast
 */
export const getTextColor = (backgroundColor) => {
  return isColorDark(backgroundColor) ? '#FFFFFF' : '#000000';
};

/**
 * Converts a hex color to RGB
 * @param {string} hex - Hex color code
 * @returns {Object} - RGB color object
 */
export const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
};

/**
 * Converts RGB to hex
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} - Hex color code
 */
export const rgbToHex = (r, g, b) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Generates shades of a color
 * @param {string} hexColor - Base hex color
 * @param {number} count - Number of shades to generate
 * @returns {Array} - Array of hex color shades
 */
export const generateShades = (hexColor, count = 9) => {
  const { r, g, b } = hexToRgb(hexColor);
  const shades = [];
  
  // Generate darker to lighter shades
  for (let i = 0; i < count; i++) {
    const factor = -0.4 + (i / (count - 1)) * 0.8; // Range from -0.4 (darker) to 0.4 (lighter)
    
    // Calculate new RGB values
    const newR = Math.min(255, Math.max(0, Math.round(r * (1 + factor))));
    const newG = Math.min(255, Math.max(0, Math.round(g * (1 + factor))));
    const newB = Math.min(255, Math.max(0, Math.round(b * (1 + factor))));
    
    shades.push(rgbToHex(newR, newG, newB));
  }
  
  return shades;
};

/**
 * Simple algorithm to approximate a color name
 * @param {string} hexColor - Hex color code
 * @returns {string} - Approximate color name
 */
export const getColorName = (hexColor) => {
  const { r, g, b } = hexToRgb(hexColor);
  
  // Basic color name approximation
  const hue = getHue(r, g, b);
  const saturation = getSaturation(r, g, b);
  const lightness = getLightness(r, g, b);
  
  // Very dark colors (almost black)
  if (lightness < 15) {
    return 'Black';
  }
  
  // Very light colors (almost white)
  if (lightness > 95) {
    return 'White';
  }
  
  // Gray colors (low saturation)
  if (saturation < 10) {
    if (lightness < 30) return 'Dark Gray';
    if (lightness < 70) return 'Gray';
    return 'Light Gray';
  }
  
  // Determine color name based on hue
  let colorName = '';
  
  if (hue < 30 || hue >= 330) colorName = 'Red';
  else if (hue < 60) colorName = 'Orange';
  else if (hue < 90) colorName = 'Yellow';
  else if (hue < 150) colorName = 'Green';
  else if (hue < 210) colorName = 'Cyan';
  else if (hue < 270) colorName = 'Blue';
  else if (hue < 330) colorName = 'Purple';
  
  // Add modifiers based on lightness
  if (lightness < 30) {
    return 'Dark ' + colorName;
  } else if (lightness > 80) {
    return 'Light ' + colorName;
  }
  
  return colorName;
};

/**
 * Calculate the hue from RGB
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} - Hue value (0-360)
 */
const getHue = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  
  if (max === min) {
    return 0; // achromatic
  }
  
  const delta = max - min;
  
  if (max === r) {
    hue = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
  } else if (max === g) {
    hue = ((b - r) / delta + 2) * 60;
  } else {
    hue = ((r - g) / delta + 4) * 60;
  }
  
  return Math.round(hue);
};

/**
 * Calculate the saturation from RGB
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} - Saturation value (0-100)
 */
const getSaturation = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  
  if (max === min) {
    return 0; // achromatic
  }
  
  const delta = max - min;
  const saturation = lightness > 0.5 
    ? delta / (2 - max - min) 
    : delta / (max + min);
  
  return Math.round(saturation * 100);
};

/**
 * Calculate the lightness from RGB
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} - Lightness value (0-100)
 */
const getLightness = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  
  return Math.round(lightness * 100);
};

/**
 * Generates a balanced color palette
 * @returns {Array} - Array of 5 hex colors (3 dark, 1 neutral, 1 accent)
 */
export const generateBalancedPalette = () => {
  // Generate dark colors (3)
  const darkColors = Array(3).fill().map(() => {
    let color;
    do {
      color = generateRandomColor();
    } while (!isColorDark(color));
    return color;
  });
  
  // Generate neutral color (1)
  const neutralColor = (() => {
    let color;
    do {
      color = generateRandomColor();
      const { r, g, b } = hexToRgb(color);
      // Check if the color is relatively neutral (similar R, G, B values)
      const range = Math.max(r, g, b) - Math.min(r, g, b);
    } while (isColorDark(color));
    return color;
  })();
  
  // Generate accent color (1) - brighter, more saturated
  const accentColor = (() => {
    let color;
    do {
      color = generateRandomColor();
      const { r, g, b } = hexToRgb(color);
      const saturation = getSaturation(r, g, b);
    } while (isColorDark(color) || getSaturation(hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b) < 70);
    return color;
  })();
  
  return [...darkColors, neutralColor, accentColor];
};

/**
 * Checks if a color matches a category based on common associations
 * @param {string} hexColor - Hex color code
 * @param {string} category - Category name
 * @returns {boolean} - True if the color matches the category
 */
export const doesColorMatchCategory = (hexColor, category) => {
  const { r, g, b } = hexToRgb(hexColor);
  const hue = getHue(r, g, b);
  const saturation = getSaturation(r, g, b);
  const lightness = getLightness(r, g, b);
  
  // Category matching logic based on color characteristics
  switch (category.toLowerCase()) {
    case 'nature':
      // Greens, browns, blues
      return (hue >= 90 && hue < 150) || // Greens
             (hue >= 20 && hue < 40 && saturation < 60) || // Browns
             (hue >= 180 && hue < 240); // Blues
    
    case 'technology':
      // Blues, silvers, blacks
      return (hue >= 180 && hue < 240) || // Blues
             (saturation < 15 && lightness > 60) || // Silvers
             (lightness < 20); // Blacks
    
    case 'food':
      // Reds, oranges, yellows, browns
      return (hue < 60) || // Reds, oranges, yellows
             (hue >= 20 && hue < 40 && saturation < 60); // Browns
    
    case 'fashion':
      // Blacks, whites, reds, purples
      return (lightness < 15) || // Blacks
             (lightness > 90) || // Whites
             (hue < 10 || hue >= 340) || // Reds
             (hue >= 270 && hue < 330); // Purples
    
    case 'art':
      // Vibrant colors with high saturation
      return saturation > 70;
    
    default:
      return true;
  }
};

/**
 * Generates a palette filtered by category
 * @param {string} category - Category name
 * @returns {Array} - Array of 5 hex colors that match the category
 */
export const generateCategoryPalette = (category) => {
  if (!category) {
    return generateBalancedPalette();
  }
  
  const palette = [];
  
  // Try to generate 3 dark colors that match the category
  let attempts = 0;
  while (palette.length < 3 && attempts < 100) {
    const color = generateRandomColor();
    if (isColorDark(color) && doesColorMatchCategory(color, category)) {
      palette.push(color);
    }
    attempts++;
  }
  
  // Fill remaining dark slots if needed
  while (palette.length < 3) {
    let color;
    do {
      color = generateRandomColor();
    } while (!isColorDark(color));
    palette.push(color);
  }
  
  // Generate neutral color that matches category
  attempts = 0;
  let neutralColor;
  while (!neutralColor && attempts < 100) {
    const color = generateRandomColor();
    if (!isColorDark(color) && doesColorMatchCategory(color, category)) {
      neutralColor = color;
    }
    attempts++;
  }
  
  // Fallback to any neutral color if needed
  if (!neutralColor) {
    do {
      neutralColor = generateRandomColor();
    } while (isColorDark(neutralColor));
  }
  
  // Generate accent color that matches category
  attempts = 0;
  let accentColor;
  while (!accentColor && attempts < 100) {
    const color = generateRandomColor();
    const { r, g, b } = hexToRgb(color);
    const saturation = getSaturation(r, g, b);
    if (!isColorDark(color) && saturation > 70 && doesColorMatchCategory(color, category)) {
      accentColor = color;
    }
    attempts++;
  }
  
  // Fallback to any accent color if needed
  if (!accentColor) {
    do {
      accentColor = generateRandomColor();
      const { r, g, b } = hexToRgb(accentColor);
      const saturation = getSaturation(r, g, b);
    } while (isColorDark(accentColor) || getSaturation(hexToRgb(accentColor).r, hexToRgb(accentColor).g, hexToRgb(accentColor).b) < 70);
  }
  
  return [...palette, neutralColor, accentColor];
};