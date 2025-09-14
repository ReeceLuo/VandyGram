import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import type { UserProps } from "../interfaces";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const dispatch = useDispatch() as any;

  const handleSearch = async (e: { key: string }) => {
    if (e.key === "Enter") {
      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          "api/user/discover",
          { input },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        data.success ? setUsers(data.users) : toast.error(data.message);
        setLoading(false);
        setInput("");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token ?? undefined));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Discover other profiles
          </h1>
          <p className="text-slate-600">
            Follow other Commodores and grow your network
          </p>
        </div>

        {/* Search Bar*/}
        <div className="mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search people by username, major, or living area..."
                className="pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>
        {loading && <Loading height="60vh" />}
      </div>
    </div>
  );
};

export default Discover;
