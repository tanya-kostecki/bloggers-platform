import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { generateAuthToken } from '../../utils/generate-auth-token';
import { clearDatabase } from '../../utils/clearDatabase';
import request from 'supertest';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { createBlog } from '../../utils/blogs/create-blog';
import { getBlogDto } from '../../utils/blogs/get.blog-dto';

describe('Blogs API Validation', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateAuthToken();
  const validBlog = getBlogDto();

  beforeAll(async () => {
    await clearDatabase(app);
  });

  it('❌ should not create post without auth token', async () => {
    const response = await request(app).post(BLOGS_PATH).send(validBlog);
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });

  it('❌ should not create a blog with invalid data; POST /api/blogs', async () => {
    const invalidDataOne = {
      name: '',
      description: '',
      websiteUrl: '',
    };

    const invalidDataTwo = {
      name: 'a'.repeat(50),
      description: 'b'.repeat(501),
      websiteUrl: 'https://example.com/',
    };

    const responseOne = await createBlog(app, invalidDataOne);
    const responseTwo = await createBlog(app, invalidDataTwo);

    expect(responseOne.status).toBe(HttpStatus.BadRequest);
    expect(responseOne.body).toHaveProperty('errorsMessages');
    expect(responseOne.body.errorsMessages).toHaveLength(3);

    expect(responseTwo.status).toBe(HttpStatus.BadRequest);
    expect(responseTwo.body).toHaveProperty('errorsMessages');
    expect(responseTwo.body.errorsMessages).toHaveLength(2);
  });

  it('❌ should not update post without auth token', async () => {
    const blog = await createBlog(app);
    const response = await request(app)
      .put(`${BLOGS_PATH}/${blog.body.id}`)
      .send(validBlog);
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });

  it('❌ should not update a blog by id with incorrect data', async () => {
    const blog = await createBlog(app);
    const invalidDataOne = {
      name: '',
      description: '',
      websiteUrl: '',
    };
    const invalidDataTwo = {
      name: 'Hello Backend',
      description: 'A blog about backend development',
    };

    const responseOne = await request(app)
      .put(`${BLOGS_PATH}/${blog.body.id}`)
      .set('Authorization', adminToken)
      .send(invalidDataOne);

    const responseTwo = await request(app)
      .put(`${BLOGS_PATH}/${blog.body.id}`)
      .set('Authorization', adminToken)
      .send(invalidDataTwo);

    expect(responseOne.status).toBe(HttpStatus.BadRequest);
    expect(responseOne.body).toHaveProperty('errorsMessages');
    expect(responseOne.body.errorsMessages).toHaveLength(3);

    expect(responseTwo.status).toBe(HttpStatus.BadRequest);
    expect(responseTwo.body).toHaveProperty('errorsMessages');
    expect(responseTwo.body.errorsMessages).toHaveLength(1);
  });

  it('❌ should not delete a blog without auth token', async () => {
    const blog = await createBlog(app);
    const response = await request(app).delete(`${BLOGS_PATH}/${blog.body.id}`);
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });
});
