import { BadgeCheck } from "lucide-react";
import moment from "moment";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-x1 shadow p-4 space-y-4 w-full max-w-2x1">
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
        <div className="text-gray-800 text-sm whitespace-pre-line" />
      )}
    </div>
  );
};

export default PostCard;
