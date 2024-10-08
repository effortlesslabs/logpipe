import { create, StateCreator } from "zustand";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware";

interface GlobalState {
  logged: boolean;
  setLogged: (logged: boolean) => void;
}

type GlobalStatePersist = (
  config: StateCreator<GlobalState>,
  options: PersistOptions<GlobalState>
) => StateCreator<GlobalState>;

export const useGlobalStore = create<GlobalState>()(
  (persist as GlobalStatePersist)(
    (set) => ({
      logged: false,
      setLogged: (logged: boolean) => {
        set({ logged });
      },
    }),
    {
      name: "global-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
