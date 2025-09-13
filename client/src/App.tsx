import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <Toaster />
      <Routes>
        // Default route to login page if there is not user, otherwise go to
        layout
        {/* <Route path="/" element={<Login />}> */}
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} /> // index means default child route
          <Route path="friends" element={<Friends />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
