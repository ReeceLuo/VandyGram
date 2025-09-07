import { BadgeCheck, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { StoryProps } from "../interfaces";

interface StoryViewerProps {
  currStory: StoryProps | null;
  setCurrStory: React.Dispatch<React.SetStateAction<StoryProps | null>>;
}

const StoryViewer = ({ currStory, setCurrStory }: StoryViewerProps) => {
  //   Progress bar state and setter
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: number | undefined, progressInterval: number | undefined;
    // Only use progress bar and timer if text or image, NOT video
    if (currStory && currStory.media_type !== "video") {
      setProgress(0);
      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);

      timer = setTimeout(() => {
        setCurrStory(null);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currStory, setCurrStory]); // only runs when story changes

  if (!currStory) return null;

  //   Closing out of story viewer
  const handleClose = () => {
    setCurrStory(null);
  };

  // Shows story content based on story type
  const renderContent = () => {
    switch (currStory.media_type) {
      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center p-8 text-white text-2x1 text-center">
            {currStory.content}
          </div>
        );
      case "image":
        return (
          <img
            src={currStory.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain"
          />
        );
      case "video":
        return (
          <video
            onEnded={() => setCurrStory(null)} // when video ends, state set to no story
            src={currStory.media_url}
            className="max-w-full max-h-screen object-contain"
            controls
            autoPlay
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center"
      style={{
        backgroundColor:
          currStory.media_type === "text"
            ? currStory.background_color
            : "#000000",
      }}
    >
      {/* Story progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* User Info (top-left) */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2x1 rounded bg-black/50">
        <img
          src={currStory.user?.profile_picture}
          alt=""
          className="ize-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{currStory.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3x1 font-bold foxus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* Content wrapper */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {renderContent()};
      </div>
    </div>
  );
};

export default StoryViewer;
