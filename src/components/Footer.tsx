import React from "react";

import { quickLinks, settingMenu } from "../utils/constants";
import FooterLinkList from "./FooterLinkList";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f2f2f2]">
      <div className="flex py-[15px] px-[15px] md:px-[30px] border-b border-[#dadce0]">
        <span className="text-[#70757a] text-[15px] leading-none">Belarus</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between py-3 md:py-0 md:px-[15px] border-b border-[#dadce0]">
        <FooterLinkList items={quickLinks} />
        <FooterLinkList items={settingMenu} />
      </div>
    </footer>
  );
};

export default Footer;
