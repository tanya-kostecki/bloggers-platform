import express from 'express';
import { setupApp } from '../../../src/setup-app';
// @ts-ignore
import { generateAuthToken } from '../../utils/generate-auth-token';
// @ts-ignore
import { clearDatabase } from '../../utils/clearDatabase';
import { HttpStatus } from '../../../src/core/types/http-statuses';
// @ts-ignore
import { createPost } from '../../utils/posts/create-post';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { runDB, stopDB } from '../../../src/db/mongo.db';
import { SETTINGS } from '../../../src/core/settings/settings';

describe('Posts API', () => {
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

  it('should create a post; POST /api/posts', async () => {
    const response = await createPost(app);

    expect(response.status).toBe(HttpStatus.Created);
    expect(response.body).toHaveProperty('title');
  });

  it('should return all posts; GET /api/posts', async () => {
    await createPost(app);
    await createPost(app);

    const response = await request(app).get(POSTS_PATH);

    expect(response.status).toBe(HttpStatus.Ok);
    expect(response.body).toHaveProperty('items');
    expect(response.body.items).toBeInstanceOf(Array);
    expect(response.body.items.length).toBeGreaterThanOrEqual(2);
    expect(response.body).toHaveProperty('page');
    expect(response.body).toHaveProperty('pageSize');
    expect(response.body).toHaveProperty('pagesCount');
    expect(response.body).toHaveProperty('totalCount');
  });

  it('should return posts by id; GET /api/posts/:id', async () => {
    const post = await createPost(app);

    const response = await request(app).get(`${POSTS_PATH}/${post.body.id}`);

    expect(response.status).toBe(HttpStatus.Ok);
    expect(response.body.title).toBe(post.body.title);
  });

  it('should update post by id; PUT /api/posts/:id', async () => {
    const post = await createPost(app);

    const updatedPost = {
      title: 'Updated Title',
      shortDescription: 'Updated description',
      content: 'Updated content here',
      blogId: post.body.blogId,
    };

    const response = await request(app)
      .put(`${POSTS_PATH}/${post.body.id}`)
      .set('Authorization', adminToken)
      .send(updatedPost);

    expect(response.status).toBe(HttpStatus.NoContent);

    const resultedPost = await request(app).get(
      `${POSTS_PATH}/${post.body.id}`,
    );
    expect(resultedPost.status).toBe(HttpStatus.Ok);
    expect(resultedPost.body.title).toBe('Updated Title');
    expect(resultedPost.body.shortDescription).toBe('Updated description');
    expect(resultedPost.body.content).toBe('Updated content here');
  });
});
