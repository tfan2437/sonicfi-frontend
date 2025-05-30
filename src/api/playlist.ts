import { axiosInstance } from "@/lib/axios";

// GET /playlists/user/:uid
export const getPlaylists = async (uid: string) => {
  const response = await axiosInstance.get(`playlists/user/${uid}`);
  return response.data.playlists;
};

// POST /playlists/user/:uid
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

// GET /playlists/:id
export const getPlayList = async (_id: string) => {
  const response = await axiosInstance.get(`playlists/${_id}`);
  return response.data.playlist;
};

// DELETE /playlists/:id
export const deletePlaylist = async (_id: string) => {
  const response = await axiosInstance.delete(`playlists/${_id}`);
  return response.data.success;
};

// PUT /playlists/:id
export const updatePlaylist = async ({
  _id,
  name = "",
  track_ids = [],
}: {
  _id: string;
  name?: string;
  track_ids?: string[];
}) => {
  const response = await axiosInstance.put(`playlists/${_id}`, {
    name,
    track_ids,
  });
  return response.data.success;
};
