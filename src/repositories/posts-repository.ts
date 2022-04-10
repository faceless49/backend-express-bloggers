import {PostType} from '../types';
import {bloggersRepository} from './bloggers-repository';

const posts: PostType[] = [
  {
    id: 1,
    title: 'hello',
    shortDescription: 'world hello',
    content: 'lorem',
    bloggerId: 1,
    bloggerName: 'Dimych',
  },
  {
    id: 2,
    title: 'hello',
    shortDescription: 'world hello',
    content: 'lorem',
    bloggerId: 2,
    bloggerName: 'Max',
  },
];


export const postsRepository = {
  findPosts() {
    return posts
  },
  createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
    const bloggers = bloggersRepository.getAllBloggers();
    const blogger = bloggers.find(({id}) => id === bloggerId)
    if (blogger) {
      const newPost: PostType = {
        id: +new Date(),
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: blogger.name,
      };
      posts.push(newPost);
      return newPost
    }
  },

  findPostById(postId: number) {
    return posts.find((p) => p.id === postId)
  },

  updatePostById(id: number, title: string, shortDescription: string, content: string) {
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.title = title;
      post.shortDescription = shortDescription;
      post.content = content;
      return 200
     }
  },
  deletePostById(id: number) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i,1)
        return true
      }
    }
    return false
  }

}