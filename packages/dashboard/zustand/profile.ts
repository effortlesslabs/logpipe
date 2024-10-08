import { create, StateCreator } from "zustand";
import { Profile } from "@/types/profile";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware";

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

type ProfileStatePersist = (
  config: StateCreator<ProfileState>,
  options: PersistOptions<ProfileState>
) => StateCreator<ProfileState>;

export const useProfileStore = create<ProfileState>(
  (persist as ProfileStatePersist)(
    (set) => ({
      profile: null,
      setProfile: (profile) => {
        set({ profile });
      },
      clearProfile: () => {
        set({ profile: null });
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
