export type BloggerType = {
  id: number;
  name: string;
  youtubeUrl: string;
};

export type PostType = {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
  bloggerName?: string;
};

export type UserType = {
  id: string
  login: string
}
export type CommentsType = {
  id: string
  content: string
  userId: string
  userLogin: string
  addedAt: string
}