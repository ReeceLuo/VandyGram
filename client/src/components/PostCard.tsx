import { BadgeCheck, Heart, MessageCircle } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import type { PostProps } from "../interfaces";
import { useSelector } from "react-redux";

const PostCard = ({ post }: { post: PostProps }) => {
  // Edits post with hashtags
  const postWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-600">$1</span>'
  );

  const [numLikes, setNumLikes] = useState(post.likes_count);
  const currUser = useSelector((state: any) => state.user.value);

  const handleLike = async () => {};
  return (
    <div className="bg-white rounded-x1 shadow p-4 space-y-4 w-full max-w-2xl">
      {/* User info */}
      <div className="inline-flex items-center gap-3 cursor-pointer">
        <img
          src={post.user.profile_picture}
          alt=" "
          className="w-10 h-10 rounded-full shadow"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span>{post.user.full_name}</span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {/* Post Content */}
      {post.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}
      {/* Images */}
      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((img, index) => (
          <img
            src={img}
            key={index}
            alt=""
            className={`w-full h-48 object-cover rounded-lg ${
              post.image_urls.length === 1 && `col-span-2 h-auto`
            }`}
          />
        ))}
      </div>
      {/* Post actions (likes, comments, etc.) */}
      <div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
        <div className="flex items-center gap-1">
          <Heart
            onClick={handleLike}
            className={`w-4 h-4 cursor-pointer ${
              numLikes.includes(currUser._id) && `text-red-500 fill-red-500`
            }`}
          />
          <span>{numLikes.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{12}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
