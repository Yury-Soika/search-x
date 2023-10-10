import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { suggestions } from "../utils/constants";
import SearchBar from "./SearchBar";
import SuggestionsList from "./SuggestionsList";
import { SearchProps } from "../utils/types";
import useLocalStorage from "../hooks/useLocalStorage";

const filterSuggestions = (arr: string[], value: string): string[] => {
  const regex = new RegExp(value, "i");
  return arr.filter((item) => regex.test(item.toString()));
};

export default ({ searchValue }: SearchProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>(searchValue || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const [isSuggestionsVisible, setSuggestionsVisible] =
    useState<boolean>(false);

  const [savedQueries, setSavedQueries] = useLocalStorage("savedQueries", []);

  useEffect(() => {
    const savedQueries = JSON.parse(
      localStorage.getItem("savedQueries") || "[]"
    );
    setSavedQueries(savedQueries);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        setInputValue(filteredSuggestions[selectedSuggestionIndex]);
        setSelectedSuggestionIndex(-1);
        navigate(`/${filteredSuggestions[selectedSuggestionIndex]}`);
      } else if (inputValue.length > 0) {
        if (!savedQueries.includes(inputValue)) {
          const updatedQueries = [...savedQueries, inputValue];
          setSavedQueries(updatedQueries);
          localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));
        }
        navigate(`/${inputValue}`);
      }
    } else if (e.key === "Escape") {
      setFilteredSuggestions([]);
    }
  };

  const handleChange = (value: string) => {
    setInputValue(value);

    if (value) {
      const matchingFromLocal = filterSuggestions(savedQueries, value);
      const matchingKeywords = filterSuggestions(suggestions, value);

      const filteredPhrases = [
        ...new Set([...matchingFromLocal, ...matchingKeywords]),
      ].slice(0, 10);

      setFilteredSuggestions(filteredPhrases);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const inputValueHandler = () => {
    if (inputValue && inputValue.length > 0) {
      if (!savedQueries.includes(inputValue)) {
        const updatedQueries = [...savedQueries, inputValue];
        setSavedQueries(updatedQueries);
        localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));
      }
      navigate(`/${inputValue}`);
    }
  };

  const reset = () => {
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleDeleteQuery = (queryToDelete: string) => {
    const updatedQueries = savedQueries.filter(
      (query) => query !== queryToDelete
    );
    setSavedQueries(updatedQueries);
    localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));

    handleChange(inputValue);
  };

  const handlePageClick = () => {
    setFilteredSuggestions([]);
  };

  const handleSearchClick = () => {
    handleFocus();
  };

  const handleFocus = () => {
    setSuggestionsVisible(true);
    if (inputValue) {
      handleChange(inputValue);
    } else if (savedQueries.length > 0) {
      setFilteredSuggestions(savedQueries.slice(0, 10));
    }
  };

  const handleBlur = () => {
    if (isSuggestionsVisible) {
      setTimeout(() => {
        setFilteredSuggestions([]);
      }, 150);
    }
  };

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      <SearchBar
        inputValue={inputValue}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handlePageClick={handlePageClick}
        inputValueHandler={inputValueHandler}
        reset={reset}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleSearchClick}
      />
      {isSuggestionsVisible &&
      filteredSuggestions &&
      filteredSuggestions.length > 0 ? (
        <SuggestionsList
          suggestions={filteredSuggestions}
          savedQueries={savedQueries}
          handleSuggestionClick={(suggestion) => {
            setInputValue(suggestion);
            navigate(`/${suggestion}`);
          }}
          handleDeleteQuery={handleDeleteQuery}
          selectedSuggestionIndex={selectedSuggestionIndex}
          setSelectedSuggestionIndex={setSelectedSuggestionIndex}
        />
      ) : null}
    </div>
  );
};
