import React from "react";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const SearchResultHeader: React.FC<{ searchValue?: string }> = React.memo(
  ({ searchValue }) => {
    const navigate = useNavigate();

    return (
      <div className="p-[15px] pb-0 md:pr-5 md:pl-20 md:pt-7 border-b border-[#ebebeb] flex md:block flex-col items-center sticky top-0 bg-white">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center grow">
            <h1
              className="text-3l font-bold mr-4 cursor-pointer"
              onClick={() => navigate(`/`)}
            >
              Search-X
            </h1>
            <Search searchValue={searchValue} />
          </div>
        </div>
      </div>
    );
  }
);

export default SearchResultHeader;
