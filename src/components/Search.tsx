import FaIcon from "./FaIcon.tsx";

const Search: React.FC<{
  searchQuery: string;
  setSearchQuery: (arg0: string) => void;
  placeholder?: string;
}> = ({ searchQuery, setSearchQuery, placeholder = "Busca un Archivo..." }) => {
  return (
    <div
      className="animate-scale-in relative flex items-center bg-mantle rounded-lg w-full max-w-50"
      style={{ animationDelay: "0.2s" }}
    >
      <button className="size-10">
        <FaIcon name="magnifying-glass" light />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="absolute size-full pl-8 py-2 text-text text-md outline-none border border-transparent focus:border-surface-0 transition-all placeholder:text-surface-1 rounded-lg"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <FaIcon name="xmark" size="size-5" />
        </button>
      )}
    </div>
  );
};

export default Search;
