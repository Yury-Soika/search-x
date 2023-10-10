import React from "react";

type FooterLinkListProps = {
  items: string[];
};

export default ({ items }: FooterLinkListProps) => {
  return (
    <div className="flex justify-center">
      {items.map((item, index) => (
        <span
          key={index}
          className="text-[#70757a] text-[12px] md:text-[14px] leading-none p-[10px] md:p-[15px]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};
