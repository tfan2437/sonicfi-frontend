export interface Album {
  _id: string;
  type: string;
  name: string;
  artists: ArtistCredit[];
  image: {
    url: string;
    width: number;
    height: number;
  };
  color: string;
  release_date: string;
  tracks: string[];
  popularity: number;
  label: string;
  copyright: string;
}

export interface Track {
  _id: string;
  name: string;
  preview_url: string;
  duration: number;
  album: {
    _id: string;
    type: string;
    name: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    release_date: string;
  };
  release_date: string;
  track_number: number;
  disc_number: number;
  artists: ArtistCredit[];
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
  top_tracks: string[];
  external_links: {
    name: string;
    url: string;
  }[];
  biography: string;
}

export interface ArtistCredit {
  _id: string;
  name: string;
  profile_image: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}

export interface User {
  uid: string;
  username: string;
  email: string;
  image_url: string;
  theme: string;
  provider: string;
  // date
  createdAt: string;
  updatedAt: string;
}

export interface Playlist {
  _id: string;
  uid: string;
  name: string;
  track_ids: string[];
  tracks: Track[];
}

export type PlaylistDisplayMode = "playlists" | "albums" | "artists";
export type HomeDisplayMode = "all" | "albums" | "artists" | "tracks";
