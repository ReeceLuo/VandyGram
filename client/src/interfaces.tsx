export interface Story {
  _id: string;
  user: {
    _id: string;
    email: string;
    full_name: string;
    username: string;
    bio: string;
    profile_picture: string;
    cover_photo: string;
    location: string;
    followers: string[];
    following: string[];
    connections: string[];
    // posts: [];
    is_verified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  content: string;
  media_url: string;
  media_type: string;
  background_color: string;
  createdAt: string;
  updatedAt: string;
}
