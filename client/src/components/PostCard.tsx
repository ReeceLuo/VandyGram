import { BadgeCheck, Heart, MessageCircle } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import type { PostProps } from "../interfaces";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

import { dummyUserData } from "../assets/assets";

const PostCard = ({ post }: { post: PostProps }) => {
  const user = dummyUserData;

  // Edits post with hashtags
  const postWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-600">$1</span>'
  );

  const [numLikes, setNumLikes] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        username: "John Doe",
        profile_picture: user.profile_picture,
      },
      content: "This is a sample comment!",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      user: {
        username: "Jane Smith",
        profile_picture: user.profile_picture,
      },
      content: "Great post! Thanks for sharing.",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
  ]);

  // const fetchComments = async () => {
  //   try {
  //     const { data } = await api.get(`api/post/${post._id}/comments`, {
  //       headers: { Authorization: `Bearer ${await getToken()}` },
  //     });

  //     if (data.success) {
  //       setComments(data.comments);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error("An unknown error occurred");
  //     }
  //   }
  // };

  const currentUser = useSelector((state: any) => state.user.value);

  const { getToken } = useAuth();

  const handleLike = async () => {
    try {
      const { data } = await api.post(
        "api/post/like",
        { postId: post._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setNumLikes((prev) => {
          if (prev.includes(currentUser._id)) {
            return prev.filter((id) => id !== currentUser._id);
          } else {
            return [...prev, currentUser._id];
          }
        });
      } else {
        toast(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="bg-white rounded-x1 shadow p-4 space-y-4 w-full max-w-2xl relative">
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
              numLikes.includes(currentUser._id) && `text-red-500 fill-red-500`
            }`}
          />
          <span>{numLikes.length}</span>
        </div>
        <button
          className="flex items-center gap-1 hover:text-gray-600 transition-colors"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comments.length} Comments</span>
        </button>

        {showComments && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white border-t border-gray-200 shadow-lg max-h-96 overflow-y-auto">
            <div className="p-4 space-y-3">
              {/* Comments List */}
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 p-3 rounded-lg flex gap-3"
                  >
                    <img
                      src={comment.user.profile_picture}
                      alt=""
                      className="w-10 h-10 mt-0.5 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {comment.user.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Leave a comment..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
