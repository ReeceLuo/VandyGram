import React, { useEffect, useState } from "react";
import { dummyRecentActivityData } from "../assets/assets";
import moment from "moment";
import type { ActionProps } from "../interfaces";

const RecentActivity = () => {
  const [activity, setActivity] = useState([]);
  const [seen, setSeen] = useState(false);

  const fetchRecentActivity = async () => {
    setActivity(dummyRecentActivityData);
  };

  const fetchSeen = async () => {};

  useEffect(() => {
    fetchRecentActivity();
    fetchSeen();
  }, []);

  // Displays text depending on which interaction
  const actionDescription = (action: ActionProps) => {
    switch (action.activity_type) {
      case "like":
        return <p>liked your post.</p>;
      case "comment":
        return <p>commented on your post.</p>;
      case "follow":
        return <p>started following you.</p>;
      default:
        return <p>interacted with your post or profile.</p>;
    }
  };

  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-8 mb-4">Recent Activity</h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar"></div>
      {activity.map((action, index) => (
        <div
          onClick={() => setSeen(true)}
          className="flex items-start gap-2 py-2 hover:bg-slate-100"
        >
          <img
            src={action.from_user_id.profile_picture}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div className="w-full">
            <div className="flex justify-between">
              <p className="font-medium">{action.from_user_id.username}</p>
              <p className="text-[10px] text-slate-400">
                {moment(action.createdAt).fromNow()}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="text-slate-500">{actionDescription(action)}</div>
              {!seen && (
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-300 to-yellow-600 rounded-full mr-3 mt-0.5"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
