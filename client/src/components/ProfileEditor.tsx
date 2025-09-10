import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

interface EditForm {
  username: string;
  bio: string;
  location: string;
  profile_picture: File | null;
  cover_photo: File | null;
  full_name: string;
  grad_year: string | number;
}

const ProfileEditor = ({
  setShowEdit,
}: {
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = useState<EditForm>({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
    grad_year: user.grad_year,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>
          <form className="space-y-4" onSubmit={handleSaveProfile}>
            {/* Profile Picture */}
            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="profile_picture"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Picture
                <input
                  hidden
                  onChange={(e) =>
                    setEditForm({
                      ...editForm, // ... (spread operator) copies all existing values from editForm
                      profile_picture: e.target.files?.[0] || null,
                    })
                  }
                  type="file"
                  accept="image/*"
                  id="profile_picture"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                />
                <div className="group/profile relative">
                  <img
                    src={
                      editForm.profile_picture
                        ? URL.createObjectURL(editForm.profile_picture)
                        : user.profile_picture // will display user's original pic if no state was found
                    }
                    alt=""
                    className="w-24 h-24 rounded-full object-cover mt-2"
                  />
                  <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                </div>
              </label>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cover photo */}
              <div className="flex flex-col items-start gap-3">
                <label
                  htmlFor="cover_photo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cover Photo
                  <input
                    hidden
                    onChange={(e) =>
                      setEditForm({
                        ...editForm, // ... (spread operator) copies all existing values from editForm
                        cover_photo: e.target.files?.[0] || null,
                      })
                    }
                    type="file"
                    accept="image/*"
                    id="cover_photo"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                  />
                  <div className="group/cover relative">
                    <img
                      src={
                        editForm.cover_photo
                          ? URL.createObjectURL(editForm.cover_photo)
                          : user.cover_photo
                      }
                      alt=""
                      className="w-80 h-40 rounded-lg bg-gradient-to-r from-amber-300 via-yellow-200 to-yellow-400 object-cover mt-2"
                    />
                    <div className="absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center">
                      <Pencil className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex flex-col justify-around w-80">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Residential Area
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Ex: Kissam"
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    value={editForm.location}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Ex: 2028"
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        grad_year: e.target.value,
                      })
                    }
                    value={editForm.grad_year}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter your full name"
                onChange={(e) =>
                  setEditForm({ ...editForm, full_name: e.target.value })
                }
                value={editForm.full_name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter a username"
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                value={editForm.username}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Write a short bio about you"
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                value={editForm.bio}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowEdit(false)}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit" // Entire form will be submitted
                className="px-4 py-2 bg-gradient-to-r from-amber-300 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 active:scale-95 transition rounded-lg text-white cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
