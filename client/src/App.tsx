import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import Friends from "./pages/friends";
import Profile from "./pages/Profile";
import MakePost from "./pages/MakePost";
import { useUser } from "@clerk/clerk-react";

const App = () => {
  const user = useUser();

  return (
    <>
      <Routes>
        // Default route to login page if there is not user, otherwise go to
        layout
        {/* <Route path="/" element={<Login />}> */}
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} /> // index means default child route
          <Route path="friends" element={<Friends />} />
          <Route path="profile" element={<Profile />} />
          <Route path="make-post" element={<MakePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
