import React from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();

  const handleSearchValue = () => {
    if (value) {
      navigate(`/search/${value}`);
    }
  };

  return (
    <div className="md:flex hidden border-2 dark:border-gray-600 border-gray-300 rounded-sm md:w-[573px] h-[29px] items-center">
      <Input
        type="text"
        className="outline-none border-none focus-visible:ring-0 h-0 bg-background"
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className="bg-gray-100 dark:bg-background h-full border-l-2 dark:border-gray-600 border-gray-300 flex items-center cursor-pointer px-4"
        onClick={handleSearchValue}
      >
        <img
          src="/assets/icons/search.svg"
          alt="search-icon"
          className="size-4"
        />
      </div>
    </div>
  );
};

export default SearchBar;
