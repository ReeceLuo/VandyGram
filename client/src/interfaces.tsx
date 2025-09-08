export interface ActionProps {
  _id: string;
  from_user_id: UserProps;
  activity_type: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostProps {
  _id: string;
  user: UserProps;
  content: string;
  image_urls: string[];
  post_type: string;
  likes_count: string[];
  createdAt: string[];
  updatedAt: string[];
}

export interface StoryProps {
  _id: string;
  user: UserProps;
  content: string;
  media_url: string;
  media_type: string;
  background_color: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProps {
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
  posts: any[];
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
}
