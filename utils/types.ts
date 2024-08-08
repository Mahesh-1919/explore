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
  categoryId: string;
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

export type uploadData = {
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  content: any;
  categoryId: string;
};

export type CategoriesData = {
  id: string;
  name: string;
};
