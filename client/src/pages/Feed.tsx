import React, { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import Loading from "../components/Loading";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import RecentActivity from "../components/RecentActivity";
import Sponsored from "../components/Sponsored";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    setFeed(dummyPostsData);
    setLoading(false); // Once data is fetched, loading is false
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* Stories and posts */}
      <div>
        <Stories />
        <div className="p-4 space-y-6">
          {feed.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      {/* Right sidebar */}
      <div className="max-x1:hidden sticky top-0">
        <Sponsored />
        <RecentActivity />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
