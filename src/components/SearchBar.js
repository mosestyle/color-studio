import React, { useRef } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const inputRef = useRef(null);
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  
  const handleClear = () => {
    setSearchTerm('');
    inputRef.current.focus();
    if (onSearch) {
      onSearch('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search colors by name, hex code, or category..."
        className="search-input"
      />
      {searchTerm && (
        <button 
          type="button"
          onClick={handleClear} 
          className="clear-button"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <button 
        type="submit" 
        className="search-button"
        aria-label="Search"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;