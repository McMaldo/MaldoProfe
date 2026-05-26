import { FC } from "react";
import Search from "../atom/Search.tsx";
import ThemeSelector from "../atom/ThemeSelector.tsx";

const Header: FC<{
  query: string;
  setQuery: (arg0: string) => void;
}> = ({ query, setQuery }) => {
  return (
    <header className="z-10 sticky top-0 w-full flex justify-center bg-mantle border-b border-b-base px-4 sm:px-8">
      <div className="w-full max-w-7xl py-4 flex justify-between items-center">
        <h1>MaldoProfe</h1>
        <div className="w-fit flex items-center gap-2">
          <Search searchQuery={query} setSearchQuery={setQuery} />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
