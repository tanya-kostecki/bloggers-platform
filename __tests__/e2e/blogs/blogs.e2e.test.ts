import express from 'express';
import { setupApp } from '../../../src/setup-app';
// @ts-ignore
import { generateAuthToken } from '../../utils/generate-auth-token';
// @ts-ignore
import { clearDatabase } from '../../utils/clearDatabase';
// @ts-ignore
import { getBlogDto } from '../../utils/blogs/get.blog-dto';
import request from 'supertest';
import { BLOGS_PATH } from '../../../src/core/paths/paths';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BlogInputModel } from '../../../src/blogs/dto/blog-input-model';
// @ts-ignore
import { createBlog } from '../../utils/blogs/create-blog';
import { runDB, stopDB } from '../../../src/db/mongo.db';
import { SETTINGS } from '../../../src/core/settings/settings';

describe('Blogs API', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateAuthToken();

  beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL);
    await clearDatabase(app);
  });

  afterAll(async () => {
    await stopDB();
  });

  it('✅ should create a blog; POST /api/blogs', async () => {
    const newBlog: BlogInputModel = {
      ...getBlogDto(),
      name: 'Backend',
      description: 'A very short description of the blog',
    };
    const response = await createBlog(app, newBlog);

    expect(response.status).toBe(HttpStatus.Created);
    expect(response.body).toHaveProperty('name');
  });

  it('should return all the blogs; GET /api/blogs', async () => {
    await createBlog(app);
    await createBlog(app);

    const response = await request(app).get(BLOGS_PATH);

    expect(response.status).toBe(HttpStatus.Ok);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('should return a blog by id', async () => {
    const blog = await createBlog(app);
    const response = await request(app).get(`${BLOGS_PATH}/${blog.body.id}`);

    expect(response.status).toBe(HttpStatus.Ok);
    expect(response.body).toStrictEqual(blog.body);
  });

  it('should update a blog by id', async () => {
    const blog = await createBlog(app);

    const response = await request(app)
      .put(`${BLOGS_PATH}/${blog.body.id}`)
      .set('Authorization', adminToken)
      .send({
        name: 'Hello World',
        description: 'A blog about web development',
        websiteUrl: 'https://developer.com',
      });

    expect(response.status).toBe(HttpStatus.NoContent);

    const updatedBlog = await request(app).get(`${BLOGS_PATH}/${blog.body.id}`);
    expect(updatedBlog.status).toBe(HttpStatus.Ok);
    expect(updatedBlog.body.name).toBe('Hello World');
    expect(updatedBlog.body.description).toBe('A blog about web development');
    expect(updatedBlog.body.websiteUrl).toBe('https://developer.com');
  });

  it('should delete a blog by id', async () => {
    const blog = await createBlog(app);

    const response = await request(app)
      .delete(`${BLOGS_PATH}/${blog.body.id}`)
      .set('Authorization', adminToken);

    expect(response.status).toBe(HttpStatus.NoContent);
  });
});
