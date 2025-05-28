import { axiosInstance } from "@/lib/axios";

export const createPlaylist = async (
  uid: string,
  name: string,
  track_ids: string[]
) => {
  const response = await axiosInstance.post(`/playlists/user/${uid}`, {
    name,
    track_ids,
  });
  return response.data.success;
};

export const getPlaylists = async (uid: string) => {
  const response = await axiosInstance.get(`playlists/user/${uid}`);
  return response.data.playlists;
};

export const getPlayList = async (_id: string) => {
  const response = await axiosInstance.get(`playlists/${_id}`);
  return response.data.playlist;
};
