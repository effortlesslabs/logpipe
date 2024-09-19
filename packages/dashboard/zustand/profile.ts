import { Profile } from "@/types/profile";
import { create } from "zustand";

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
