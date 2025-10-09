import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 border-2 border-green-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default SearchBar;
