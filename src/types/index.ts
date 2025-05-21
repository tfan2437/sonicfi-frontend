export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  // date
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  type: string;
  name: string;
  artists: { id: string; name: string }[];
  image: {
    url: string;
    width: number;
    height: number;
  };
  color: string;
  release_date: string;
  track_ids: string[];
  total_tracks: number;
  popularity: number;
  label: string;
  copyright: string;
  // date
  createdAt: string;
  updatedAt: string;
}

export interface Track {
  _id: string;
  name: string;
  preview_url: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  duration: number;
  album_id: string;
  track_number: number;
  disc_number: number;
  artists: { id: string; name: string }[];
  playcount: number;
  // date
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  _id: string;
  name: string;
  followers: number;
  monthly_listeners: number;
  world_rank: number;
  genres: string[];
  profile_image: {
    url: string;
    width: number;
    height: number;
  };
  header_image: {
    url: string;
    width: number;
    height: number;
  };
  color: string;
  gallery: {
    url: string;
    width: number;
    height: number;
  }[];
  albums: string[];
  external_links: {
    name: string;
    url: string;
  }[];
  biography: string;
  // date
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}
