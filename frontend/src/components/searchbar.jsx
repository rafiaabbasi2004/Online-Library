import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  // Trigger filter when category changes
  useEffect(() => {
    onSearch(query, category);
  }, [category]);

  const handleSearchClick = () => {
    onSearch(query, category);
  };

  return (
    <div className="search-bar w-full flex items-center justify-between p-4">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input h-12 border-2 rounded-b-md border-gray-300 px-4 focus:outline-none focus:border-amber-900 flex-grow"
      />
      <button className="home-button mr-10 ml-2" onClick={handleSearchClick}>
        Search
      </button>
      <div className="filters h-12 flex items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="filter-icon w-6 h-6 cursor-pointer"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z"
            />
        </svg>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select ml-2 mr-6"
        >
          <option value="all" className="font-bold">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="adventure">Adventure</option>
          <option value="history">History</option>
          <option value="drama">Drama</option>
          <option value="dystopian">Dystopian</option>
          <option value="satire">Satire</option>
          <option value="philosophy">Philosophy</option>
          <option value="historical-fiction">Historical Fiction</option>
          <option value="classic">Classic</option>
          <option value="romance">Romance</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </div>
    </div>
  );
}
