import React from "react";
import Search from "./Search";
import Footer from "./Footer";
const Home: React.FC = () => {
  return (
    <div className="h-[100vh] flex flex-col">
      <main className="grow flex justify-center">
        <div className="w-full px-5 flex flex-col items-center mt-44">
          <h1 className="text-3xl font-bold mb-4">Search - X</h1>
          <div className="search-bar-container">
            <Search />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
