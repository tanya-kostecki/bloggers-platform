import { Express } from 'express';
// @ts-ignore
import { createBlog } from '../blogs/create-blog';
import { generateAuthToken } from '../generate-auth-token';
// @ts-ignore
import { getPostDto } from './get-post-dto';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { PostDto } from '../../../src/posts/application/dto/post.dto';

export const createPost = async (app: Express, postDto?: Partial<PostDto>) => {
  const adminToken = generateAuthToken();
  const blog = await createBlog(app);
  const defaultPost = getPostDto(blog.body.id);
  const newPost = { ...defaultPost, ...postDto };

  return await request(app)
    .post(POSTS_PATH)
    .set('Authorization', adminToken)
    .send(newPost);
};
