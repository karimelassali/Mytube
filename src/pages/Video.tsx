import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../context/store";
import ReactPlayer from "react-player";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import VideoCard from "../components/videoCard";

interface SingleVideoProps {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    tags: Array<string>;
    categoryId: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

interface CommentsProps {
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
        authorProfileImageUrl: string;
        authorDisplayName: string;
        likeCount: number;
        publishedAt: Date;
      };
    };
  };
}

const SingleVideoPage = () => {
  const { id } = useParams();
  const {
    singleData,
    fetchSingleData,
    isLoading,
    fetchRelatedData,
    data,
    comments,
    fetchComments,
  } = useStore();
  const [isCollapsed, setisCollapsed] = React.useState(false);
  const descriptionClassName = isCollapsed ? "line-clamp-none" : "line-clamp-2";

  useEffect(() => {
    fetchSingleData(id!);
    fetchRelatedData(id!);
    fetchComments(id!);
  }, [fetchSingleData, id, fetchRelatedData, fetchComments]);

  if (!id && isLoading) return null;

  if (!singleData) return null;

  const video = singleData! as SingleVideoProps;

  console.log(comments);

  return (
    <div className="flex 2xl:flex-row flex-col px-5 pb-10 2xl:space-y-0 space-y-10">
      <div className="flex flex-col w-full  space-y-5">
        <div className="player-wrapper">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            width="100%"
            height="100%"
            controls
          />
        </div>
        <h1 className="text-2xl font-semibold">{video?.snippet.title}</h1>
        <div className="flex items-center justify-between gap-5">
          <div>
            <p>{video.snippet.channelTitle}</p>
          </div>
          <div className="flex items-center flex-wrap gap-5">
            <div className="bg-secondary rounded-full flex items-center p-2 px-4 space-x-3">
              <ThumbsUp className="size-4" />
              <span className="text-sm text-muted-foreground">
                {parseInt(video.statistics.likeCount) >= 100000 &&
                  video.statistics.likeCount.slice(0, 3) + "k"}
              </span>
              <span className="text-muted-foreground text-sm">|</span>
              <ThumbsDown className="size-4" />
            </div>
          </div>
        </div>
        <div className="bg-secondary p-4">
          <div className="flex items-center gap-x-3 text-sm">
            <p>
              {parseInt(video.statistics.viewCount) > 100000 &&
                video.statistics.viewCount.slice(0, 3) + "k"}{" "}
              views
            </p>
          </div>
          <div className="">
            <p
              className={`mt-5 text-sm text-muted-foreground ${descriptionClassName}`}
            >
              {video.snippet.description}
            </p>
            <button onClick={() => setisCollapsed((prev: boolean) => !prev)}>
              {isCollapsed ? "View less" : "View more"}
            </button>
          </div>
        </div>
        <p>
          {video.statistics.commentCount}{" "}
          <span className="text-muted-foreground">Comments</span>
        </p>
        <div className="flex flex-col space-y-5">
          {comments.map((comment: CommentsProps, idx) => (
            <div key={idx} className="flex items-start gap-x-4">
              <img
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-x-2">
                  <h2 className="text-sm">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      comment.snippet.topLevelComment.snippet.publishedAt
                    ).getHours()}{" "}
                    Hours ago
                  </span>
                </div>
                <p className="text-sm">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className="flex items-center p-2 space-x-3">
                    <ThumbsUp className="size-4" />
                    <span className="text-sm text-muted-foreground">
                      {comment.snippet.topLevelComment.snippet.likeCount}
                    </span>
                    <ThumbsDown className="size-4" />
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="2xl:px-10 flex flex-col space-y-5 2xl:w-96">
        {data.map((video, idx) => (
          <VideoCard video={video} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default SingleVideoPage;
