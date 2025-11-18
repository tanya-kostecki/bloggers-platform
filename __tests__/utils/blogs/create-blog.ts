import { Express } from 'express';
import request from 'supertest';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { BlogInputModel } from '../../../src/blogs/dto/blog-input-model';
import { getBlogDto } from './get.blog-dto';
import { generateAuthToken } from '../generate-auth-token';

export const createBlog = async (app: Express, blogDto?: BlogInputModel) => {
  const adminToken = generateAuthToken();
  const defaultBlog: BlogInputModel = getBlogDto();
  const newBlog = { ...defaultBlog, ...blogDto };

  return await request(app)
    .post(BLOGS_PATH)
    .set('Authorization', adminToken)
    .send(newBlog);
};
