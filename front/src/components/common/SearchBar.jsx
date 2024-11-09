import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = ({ searchFun, search, setSearch }) => {
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      searchFun();
    }
  };

  return (
    <div className="form relative">
      <button
        onClick={searchFun}
        className="absolute left-2 -translate-y-1/2 top-1/2 p-1 "
        aria-label="Search"
      >
        <Search />
      </button>
      <input
        className="input w-full rounded-full px-8 py-3 mx-2 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
        placeholder="Search..."
        required
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleEnter}
        value={search}
        type="text"
      />
      <button
        type="reset"
        onClick={() => setSearch('')}
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
        aria-label="Clear search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
