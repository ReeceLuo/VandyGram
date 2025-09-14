import { useEffect, useState } from "react";
import { sponsoredLink } from "../assets/assets";
import Loading from "../components/Loading";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import RecentActivity from "../components/RecentActivity";
import Sponsored from "../components/Sponsored";
import type { PostProps } from "../interfaces";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Feed = () => {
  const { getToken } = useAuth();

  const [feed, setFeed] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("api/post/feed", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setFeed(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
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
        <Sponsored sponsoredLink={sponsoredLink} />
        <RecentActivity />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
