import { useParams } from "react-router-dom";
import useStore from "../context/store";
import { Skeleton } from "../components/ui/skeleton";
import VideoCard from "../components/videoCard";
import { useEffect } from "react";

const Search = () => {
  const { data, isLoading, fetchSearchData } = useStore();
  const { value } = useParams();

  useEffect(() => {
    fetchSearchData(value!);
  }, [fetchSearchData, value]);

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
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 gap-5 px-5">
      {data.map((video, idx) => (
        <VideoCard video={video} key={idx} />
      ))}
    </div>
  );
};

export default Search;
