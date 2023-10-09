import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import SearchResultHeader from "./SearchResultHeader";
import Footer from "./Footer";
import SearchedItemTemplate from "./SearchedItemTemplate";
import { fakeDB } from "../utils/constants";

export type SearchResultItem = {
  title: string;
  snippet: string;
  url: string;
};

type SearchResultType = {
  items: SearchResultItem[];
  count: number;
  executionTime: string;
} | null;

const SearchResult: React.FC = () => {
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState<SearchResultType>(null);
  const [hasMore, setHasMore] = useState(true);
  const [itemsToShow, setItemsToShow] = useState<SearchResultItem[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const filterResults = async () => {
      const filteredResults: SearchResultType = await filterByKeyword(
        query || ""
      );
      setSearchResult(filteredResults);
    };
    filterResults();
  }, [query]);

  const filterByKeyword = async (keyword: string) => {
    const startTime = performance.now();
    if (!keyword) {
      return null;
    }

    const lowercaseKeyword = keyword.toLowerCase();

    const filteredData = fakeDB.filter((item) =>
      item.title.toLowerCase().includes(lowercaseKeyword)
    );
    const endTime = performance.now();

    const executionTime = (endTime - startTime).toFixed(2);

    return {
      items: filteredData,
      count: filteredData.length,
      executionTime,
    };
  };

  useEffect(() => {
    if (searchResult) {
      const currentItemsToShow = searchResult.items.slice(0, itemsPerPage);
      setItemsToShow(currentItemsToShow);
    }
  }, [searchResult]);

  const loadMore = () => {
    if (searchResult) {
      const currentLength = itemsToShow.length;
      const newItemsToShow = searchResult.items.slice(
        0,
        currentLength + itemsPerPage
      );

      if (newItemsToShow.length >= searchResult.items.length) {
        setHasMore(false);
      }

      setItemsToShow(newItemsToShow);
    }
  };

  if (!searchResult) return null;

  const { count, executionTime } = searchResult;

  return (
    <div className="flex flex-col min-h-[100vh]">
      <SearchResultHeader searchValue={query} />
      <main className="grow p-[12px] pb-0 md:pr-5 md:pl-20">
        <div className="flex text-sm text-[#70757a] mb-3">{`About ${count} results in (${executionTime} ms)`}</div>

        {itemsToShow.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <InfiniteScroll
            dataLength={itemsToShow.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {itemsToShow.map((item) => (
              <SearchedItemTemplate key={item.url} searchResultItem={item} />
            ))}
          </InfiniteScroll>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResult;
