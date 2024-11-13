import { Home } from "lucide-react";
import { cn } from "../lib/utils";
import { categories } from "../constants";
import useStore from "../context/store";

/**
 * SideBar component
 *
 * Renders a sidebar with navigation links to different categories.
 */
const SideBar = () => {
  /**
   * Get the current category from the store
   */
  const { setCategory, category } = useStore();

  return (
    <div className="px-5 flex justify-between flex-col w-64 lg:fixed bg-background z-[99999]">
      <div className="flex flex-col gap-y-4">
        {/* Home button */}
        <button
          onClick={() => setCategory("New")}
          className={cn(
            "flex items-center py-2 px-3 rounded-sm",
            category === "New" &&
              "bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800 font-medium"
          )}
        >
          {/* Home icon */}
          <Home className="size-5 mr-3" />
          {/* Home text */}
          <span className="cursor-pointer text-sm">Home</span>
        </button>

        {/* Explore header */}
        <p className="text-sm font-medium">Explore</p>

        {/* Category buttons */}
        {categories.map(({ name, icon: Icon }, idx) => (
          <button
            key={idx}
            onClick={() => setCategory(name)}
            className={cn(
              "flex items-center py-2 px-3 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 duration-200",
              category === name && "bg-gray-100 dark:bg-gray-800 font-medium"
            )}
          >
            {/* Category icon */}
            <Icon className="size-5 mr-3" />
            {/* Category text */}
            <span className="cursor-pointer text-sm">{name}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="py-5 border-t-2 mt-5">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Youtube Clone.
        </p>
      </div>
    </div>
  );
};



export default SideBar;
