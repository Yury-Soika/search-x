import React from "react";
import { SearchResultItem } from "../utils/types";

export default ({
  searchResultItem: { url, title, snippet },
}: {
  searchResultItem: SearchResultItem;
}) => (
  <div className="flex flex-col py-3 max-w-[700px]">
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group cursor-pointer"
    >
      <div className="text-sm truncate text-[#202124]">{url}</div>
      <div className="group-hover:underline text-xl text-[#1a0dab] pt-2">
        {title}
      </div>
    </a>
    <div className="text-sm text-[#4d5156] leading-6 pt-1">{snippet}</div>
  </div>
);
