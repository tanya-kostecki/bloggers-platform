import { Express } from 'express';
import { createBlog } from '../blogs/create-blog';
import { generateAuthToken } from '../generate-auth-token';
import { getPostDto } from './get-post-dto';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { PostInputModel } from '../../../src/posts/dto/post-input-model';

export const createPost = async (app: Express, postDto?: PostInputModel) => {
  const adminToken = generateAuthToken();
  const blog = await createBlog(app);
  const defaultPost = getPostDto(blog.body.id);
  const newPost = { ...defaultPost, ...postDto };

  return await request(app)
    .post(POSTS_PATH)
    .set('Authorization', adminToken)
    .send(newPost);
};
