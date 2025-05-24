import type React from "react";
import { useState } from "react";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const filteredResults = [];
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setShowResults(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-md">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
          <input
            type="text"
            placeholder="What do you want to play?"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className="w-full outline-none border-1 bg-zinc-900 placeholder:text-zinc-500 border-transparent focus:border-zinc-500 h-10 text-sm rounded-full pl-10 transition-all duration-300"
          />
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                <div className="text-sm text-gray-500 px-3 py-2 border-b">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </div>
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <SearchIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-1">Try searching for something else</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close results */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
