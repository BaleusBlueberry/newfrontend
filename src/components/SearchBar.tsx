import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ pages }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = pages.filter((page) =>
      page.name.toLowerCase().includes(lowerQuery)
    );
    setFilteredResults(results);
  };

  // Navigate to the selected page
  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setFilteredResults([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for pages..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Search Results */}
      {filteredResults.length > 0 && (
        <div className="searchBar absolute top-full left-0 w-full rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {filteredResults.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result.path)}
              className="p-2 cursor-pointer searchHover"
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
