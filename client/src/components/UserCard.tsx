import { useAuth } from "@clerk/clerk-react";
import type { UserProps } from "../interfaces";
import { MapPin, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice";

const UserCard = ({ user }: { user: UserProps }) => {
  const currentUser = useSelector((state: any) => state.user.value);
  const { getToken } = useAuth();
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();

  const handleFollow = async () => {
    try {
      const { data } = await api.post(
        "api/user/follow",
        { id: user._id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchUser((await getToken()) ?? undefined));
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
  };

  const handleFriendRequest = async () => {
    if (currentUser?.friends.includes(user._id)) {
      return navigate(`/profile/${user._id}`);
    }

    try {
      const { data } = await api.post(
        "api/user/friend",
        { id: user._id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
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
    <div
      key={user._id}
      className="p-4 pt-6 flex flex-col justify-between w-72 shadow border border-gray-200 rounded-md"
    >
      <div className="text-center">
        <img
          src={user.profile_picture}
          alt=""
          className="rounded-full w-16 shadow-md mx-auto"
        />
        <p className="mt-4 font-semibold">{user.full_name}</p>
        {user.username && (
          <p className="text-gray-500 font-light">@{user.username}</p>
        )}
        {user.bio && (
          <p className="text-gray-600 mt-2 text-center text-sm px-4">
            {user.bio}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <MapPin className="w-4 h-4" /> {user.location}
        </div>
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers.length}</span> followers
        </div>
      </div>
      <div className="flex mt-4 gap-2">
        {/* Follow button */}
        {/* Displays different based on if the user follows or not */}
        <button
          onClick={handleFollow}
          disabled={currentUser?.following.includes(user._id)}
          className="w-full py-2 rounded-md flex justify-center items-center gap-2 bg-gradient-to-r from-amber-300 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 active:scale-95 transition text-white cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />{" "}
          {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
        </button>
        {/* Friend request button */}
        <button
          onClick={handleFriendRequest}
          className={`flex items-center text-sm justify-center w-40 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition ${
            currentUser?.friends.includes(user._id) ? "" : "hover:bg-gray-100"
          }`}
        >
          {currentUser?.friends.includes(user._id) ? (
            <p>Friended</p>
          ) : (
            <p>Add Friend</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
