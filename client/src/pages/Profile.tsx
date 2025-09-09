import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
import UserProfileInfo from "../components/UserProfileInfo";

const Profile = () => {
  // useParams() - React router hook that lets you read dynamic URL parameters
  const { profileId } = useParams(); // gets profileId from .../profile/profileId
  // if !profileId (there is no profileId), the user is on their own profile page

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Cover photo */}
          <div className="h-40 md:h-56 bg-gradient-to-r from-amber-200 via-yellow-200 to-yellow-400">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* User info */}
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>
        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
            {["posts"]}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
