import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice.ts";

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken();
        dispatch(fetchUser(token));
      }
    };
    fetchData();
  }, [user, getToken, dispatch]);

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
