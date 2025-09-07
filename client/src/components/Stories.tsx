import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import type { StoryProps } from "../interfaces";
import moment from "moment";
import StoryCreator from "./StoryCreator";
import StoryViewer from "./StoryViewer";

const Stories = () => {
  const [stories, setStories] = useState<StoryProps[]>([]);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [currStory, setCurrStory] = useState<StoryProps | null>(null);

  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Add Story */}
        <div
          onClick={() => setShowStoryCreator(true)}
          className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-amber-400 bg-gradient-to-b from-amber-100 to-white"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-yellow-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create story
            </p>
          </div>
        </div>
        {/* Story cards */}
        {stories.map((story, index) => (
          <div
            onClick={() => setCurrStory(story)}
            key={index}
            className={`relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-amber-300 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 active:scale-95`}
          >
            <img
              src={story.user.profile_picture}
              alt=""
              className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
            />
            <p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24">
              {story.content}
            </p>
            <p className="text-white absolute bottom-1 right-2 z-10 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>
            {story.media_type !== "text" && (
              <div className="absolute inset-0 z-1 rounded-lg bg-black overflow-hidden">
                {story.media_type === "image" ? (
                  <img
                    src={story.media_url}
                    alt=""
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
                  ></video>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add Story Viewer*/}
      {/* Shows if showStoryCreator = True, which is set when create story card is clicked */}
      {showStoryCreator && (
        <StoryCreator
          setShowStoryCreator={setShowStoryCreator}
          fetchStories={fetchStories}
        />
      )}
      {currStory && (
        <StoryViewer currStory={currStory} setCurrStory={setCurrStory} />
      )}
    </div>
  );
};

export default Stories;
