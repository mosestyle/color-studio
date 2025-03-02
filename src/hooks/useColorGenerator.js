import { useState, useCallback } from 'react';
import { generateBalancedPalette, generateCategoryPalette } from '../utils/colorUtils';

export const useColorGenerator = (initialPalette = null, initialLockedState = null) => {
  const [palette, setPalette] = useState(initialPalette || generateBalancedPalette());
  const [lockedColors, setLockedColors] = useState(initialLockedState || Array(5).fill(false));
  
  const generateNewPalette = useCallback((category = null) => {
    setPalette(prevPalette => {
      const newPalette = category 
        ? generateCategoryPalette(category) 
        : generateBalancedPalette();
      
      // Preserve locked colors
      return prevPalette.map((color, index) => 
        lockedColors[index] ? color : newPalette[index]
      );
    });
  }, [lockedColors]);
  
  const toggleLock = useCallback((index) => {
    setLockedColors(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }, []);
  
  const updateColor = useCallback((index, color) => {
    setPalette(prevPalette => {
      const newPalette = [...prevPalette];
      newPalette[index] = color;
      return newPalette;
    });
  }, []);
  
  return {
    palette,
    lockedColors,
    generateNewPalette,
    toggleLock,
    updateColor
  };
};