import { Express } from 'express';
import request from 'supertest';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { BlogDto } from '../../../src/blogs/application/dto/blog.dto';
import { getBlogDto } from './get.blog-dto';
import { generateAuthToken } from '../generate-auth-token';

export const createBlog = async (app: Express, blogDto?: BlogDto) => {
  const adminToken = generateAuthToken();
  const defaultBlog: BlogDto = getBlogDto();
  const newBlog = { ...defaultBlog, ...blogDto };

  return await request(app)
    .post(BLOGS_PATH)
    .set('Authorization', adminToken)
    .send(newBlog);
};
