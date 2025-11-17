import { db } from '../../db/in-memory.db';
import { Post } from '../types/post';
import { PostInputModel } from '../dto/post-input-model';

export const postsRepository = {
  findAll: () => {
    return db.posts;
  },
  findOne: (id: string) => {
    return db.posts.find((blog) => blog.id === id) ?? null;
  },
  create: (post: Post) => {
    db.posts.push(post);
    return post;
  },
  update: (id: string, dto: PostInputModel) => {
    const post = db.posts.find((blog) => blog.id === id);

    if (!post) {
      throw new Error('Blog not found');
    }

    post.title = dto.title;
    post.shortDescription = dto.shortDescription;
    post.content = dto.content;
    post.blogId = dto.blogId;

    return true;
  },
  delete: (id: string) => {
    db.posts = db.posts.filter((blog) => blog.id !== id);
    return true;
  },
};
