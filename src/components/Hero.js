import React from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

const Hero = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  categories,
  onSearch
}) => {
  return (
    <div className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h2 className="hero-title">Discover Perfect Color Palettes</h2>
        <p className="hero-subtitle">
          Generate, explore, and save beautiful color combinations for your projects
        </p>
        
        <div className="search-container">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            onSearch={onSearch}
          />
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;