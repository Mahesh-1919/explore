export type user = {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
};

export type posts = {
  userId: string;
  title: string;
  content: string;
  category: string;
};

export type comment = {
  userId: string;
  postId: string;
  content: string;
};

export type like = {
  userId: string;
  postId: string;
};
