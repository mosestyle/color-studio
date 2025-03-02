import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ColorColumn from './components/ColorColumn';
import { useColorGenerator } from './hooks/useColorGenerator';
import { useKeyPress } from './hooks/useKeyPress';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getColorName, doesColorMatchCategory } from './utils/colorUtils';
import categories from './data/colorCategories';
import './styles.css';

const App = () => {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Get saved palettes from local storage
  const [savedPalettes, setSavedPalettes] = useLocalStorage('savedPalettes', []);
  
  // Initialize color generator hook
  const { 
    palette, 
    lockedColors, 
    generateNewPalette, 
    toggleLock 
  } = useColorGenerator();
  
  // Listen for spacebar press
  const spacePressed = useKeyPress(' ');
  
  // Generate new palette when spacebar is pressed
  useEffect(() => {
    if (spacePressed) {
      generateNewPalette(selectedCategory);
    }
  }, [spacePressed, generateNewPalette, selectedCategory]);
  
  // Generate new palette when category changes
  useEffect(() => {
    generateNewPalette(selectedCategory);
  }, [selectedCategory, generateNewPalette]);
  
  // Filter palette based on search term
  const filteredPalette = searchTerm
    ? palette.filter(color => {
        const name = getColorName(color).toLowerCase();
        const hex = color.toLowerCase();
        const search = searchTerm.toLowerCase();
        
        return name.includes(search) || hex.includes(search);
      })
    : palette;
  
  // Save current palette
  const savePalette = () => {
    const newSavedPalette = {
      id: Date.now().toString(),
      colors: [...palette],
      timestamp: new Date().toISOString()
    };
    
    setSavedPalettes([newSavedPalette, ...savedPalettes]);
  };
  
  return (
    <div className="app">
      <Header />
      
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onSearch={() => {}}
      />
      
      <div className="palette-container">
        {filteredPalette.map((color, index) => (
          <ColorColumn
            key={index}
            index={index}
            color={color}
            isLocked={lockedColors[index]}
            onToggleLock={() => toggleLock(index)}
          />
        ))}
      </div>
      
      <div className="controls">
        <div className="key-instructions">
          Press <kbd>spacebar</kbd> to generate a new palette
        </div>
        
        <button className="save-button" onClick={savePalette}>
          Save Palette
        </button>
      </div>
    </div>
  );
};

export default App;