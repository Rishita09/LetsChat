import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-slate-800 pt-20">
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-base-300 rounded-2xl p-5 space-y-6 shadow-lg">
          <header className="text-center">
            <h1 className="text-2xl font-semibold text-base-content mb-1">
              Profile
            </h1>
            <p className="text-base-content/60 text-sm">
              Your profile information
            </p>
          </header>

          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-base-100 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-110 p-2 rounded-full cursor-pointer transition-transform duration-200 shadow-md ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
                title="Update Profile Picture"
              >
                <Camera className="w-4 h-4 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/50 font-medium tracking-wide">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info Section */}
          <section className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-base-content/60 font-semibold mb-1">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <p className="bg-base-100 rounded-xl px-4 py-2 border border-base-300 shadow-sm truncate text-base-content text-base">
                {authUser?.fullName}
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-base-content/60 font-semibold mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <p className="bg-base-100 rounded-xl px-4 py-2 border border-base-300 shadow-sm truncate text-base-content text-base">
                {authUser?.email}
              </p>
            </div>
          </section>

          {/* Account Info */}
          <section className="bg-base-100 rounded-xl p-4 shadow-inner">
            <h2 className="text-lg font-semibold mb-3 text-base-content">
              Account Information
            </h2>
            <div className="flex flex-col gap-2 text-sm text-base-content/70">
              <div className="flex justify-between border-b border-base-300 pb-1">
                <span>Member Since:</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
