import React from "react";
import { IoMdClose } from "react-icons/io";

const SuggestionsList: React.FC<{
  suggestions: string[];
  savedQueries: string[];
  handleSuggestionClick: (suggestion: string) => void;
  handleDeleteQuery: (queryToDelete: string) => void;
  selectedSuggestionIndex: number;
  setSelectedSuggestionIndex: (index: number) => void;
}> = ({
  suggestions,
  savedQueries,
  handleSuggestionClick,
  handleDeleteQuery,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
}) => {
  return (
    <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white z-10 overflow-y-auto hidden sm:block rounded-lg border border-gray-300 shadow-md">
      {suggestions.map((suggestion, index) => (
        <div
          className={`flex justify-between items-center px-2 hover:bg-gray-200 cursor-pointer  ${
            selectedSuggestionIndex === index ? "bg-gray-200" : ""
          }`}
          key={index}
        >
          <span
            className={`flex items-center justify-between w-full py-2 pr-4 ${
              savedQueries.includes(suggestion) ? "text-purple-400" : ""
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
            onMouseEnter={() => setSelectedSuggestionIndex(index)}
          >
            {suggestion}
          </span>
          {savedQueries.includes(suggestion) && (
            <IoMdClose
              size={16}
              color="#70757a"
              className="cursor-pointer"
              onClick={() => handleDeleteQuery(suggestion)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;
