import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { SearchValue as SearchData } from "@/store/atom";

import { useRecoilState } from "recoil";
type Props = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: Props) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchValue, setSearchValue] = useRecoilState(SearchData);

  const fetchSuggestions = async (query: any) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  const getSuggestionsDebounced: any = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  useEffect(() => {
    if (searchValue.length > 2) {
      getSuggestionsDebounced(searchValue)?.then((data: any) => {
        setSuggestions(data);
      });
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">Loading...</div>}

          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
