import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

type SearchBarProps = {
  inputValue: string;
  handleChange: (value: string) => void;
  inputValueHandler: () => void;
  reset: () => void;
  handlePageClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
};

export default ({
  inputValue,
  handleChange,
  inputValueHandler,
  reset,
  handlePageClick,
  handleKeyDown,
  onFocus,
  onBlur,
  onClick,
}: SearchBarProps) => {
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputValueHandler();
      handlePageClick();
    }
  };

  return (
    <div
      id="searchBox"
      className="relative h-[46px] w-full md:w-[584px] flex items-center gap-3 px-4 border border-[#dfe1e5] rounded-3xl hover:bg-white hover:shadow-c hover:border-0 focus-within:shadow-c focus-within:border-0"
    >
      <AiOutlineSearch size={18} color="#9aa0a6" />
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        value={inputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        autoFocus
        className="grow outline-0 text-black/[0.87]"
      />
      <div className="flex items-center gap-3">
        {inputValue && (
          <IoMdClose
            size={24}
            color="#70757a"
            className="cursor-pointer"
            onClick={() => reset()}
          />
        )}
      </div>
    </div>
  );
};
