import Cookies from "js-cookie";
import { create } from "zustand";
import { Profile } from "@/types/profile";

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => {
  // Retrieve the profile from cookies if it exists
  const savedProfile = Cookies.get("profile");
  return {
    profile: savedProfile ? JSON.parse(savedProfile) : null,
    setProfile: (profile) => {
      set({ profile });
      Cookies.set("profile", JSON.stringify(profile));
    },
    clearProfile: () => {
      set({ profile: null });
      Cookies.remove("profile");
    },
  };
});
