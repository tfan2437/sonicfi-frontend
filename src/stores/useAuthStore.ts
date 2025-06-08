import { User } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: (uid: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),

  fetchUser: async (uid: string) => {
    try {
      const response = await axiosInstance.get(`/users/${uid}`);
      const { user } = response.data;
      set({ user });
    } catch (error) {
      console.log("Error in fetchArtistById: ", error);
    }
  },
}));
