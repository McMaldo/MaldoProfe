import { FC } from "react";
import Search from "../atom/Search.tsx";
import ThemeSelector from "../atom/ThemeSelector.tsx";

const Header: FC<{
  query: string;
  setQuery: (arg0: string) => void;
}> = ({ query, setQuery }) => {
  return (
    <header className="animate-pop-in z-10 sticky top-0 w-full flex justify-center bg-mantle border-b border-b-secondary sm:px-8 lg:border-none lg:bg-transparent lg:bg-linear-to-b lg:from-crust lg:to-50% lg:to-transparent">
      <div className="w-full max-w-7xl p-4 flex justify-between items-center rounded-2xl lg:border lg:border-surface-0 bg-mantle/80 backdrop-blur-lg lg:mt-2 lg:pl-8">
        <div className="w-fit flex items-center gap-2 lg:gap-4">
          <img
            src="/img/pixel-pc.webp"
            alt="pixel-pc"
            className="size-10 select-none"
          />
          <h1 className="text-xl">MaldoProfe</h1>
        </div>
        <div className="w-fit flex items-center gap-2 lg:gap-4">
          <Search searchQuery={query} setSearchQuery={setQuery} />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
