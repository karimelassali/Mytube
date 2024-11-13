import { Skeleton } from "../components/ui/skeleton";
import VideoCard from "../components/videoCard";
import useStore from "../context/store";
import { useEffect } from "react";

function App() {
  const { data, fetchData, isLoading, category } = useStore();

  useEffect(() => {
    fetchData(category);
  }, [fetchData, category]);

  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 gap-5 px-5">
        {Array.from({ length: 20 }).map((_, idx) => (
          <Skeleton key={idx} className="w-full h-[225px] rounded-sm" />
        ))}
      </div>
    );
  }

  return (
    //add a div responsive that show this only testing version not final version

    
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 gap-5 px-5">
      {data.map((video, idx) => (
        <VideoCard video={video} key={idx} />
      ))}
    </div>
  );
}

export default App;
