import express from 'express';
import { setupApp } from '../../../src/setup-app';
// @ts-ignore
import { generateAuthToken } from '../../utils/generate-auth-token';
// @ts-ignore
import { clearDatabase } from '../../utils/clearDatabase';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { HttpStatus } from '../../../src/core/types/http-statuses';
// @ts-ignore
import { createPost } from '../../utils/posts/create-post';
import { runDB, stopDB } from '../../../src/db/mongo.db';
import { SETTINGS } from '../../../src/core/settings/settings';

describe('Posts API Validation', () => {
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

  it('❌ should not create post without auth token', async () => {
    const response = await request(app)
      .post(POSTS_PATH)
      .send({ message: 'hacker' });
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });

  it('❌ should not create a post with invalid data; POST /api/posts', async () => {
    const invalidDataOne = {
      title: '',
      shortDescription: '',
      content: '',
      blogId: '',
    };

    const invalidDataTwo = {
      title: 'a'.repeat(51),
      shortDescription: 'b'.repeat(101),
      content: 'c'.repeat(1001),
      blogId: '507f1f77bcf86cd799439011',
    };

    const responseOne = await createPost(app, invalidDataOne);
    const responseTwo = await createPost(app, invalidDataTwo);

    expect(responseOne.status).toBe(HttpStatus.BadRequest);
    expect(responseOne.body).toHaveProperty('errorsMessages');
    expect(responseOne.body.errorsMessages).toHaveLength(4);

    expect(responseTwo.status).toBe(HttpStatus.BadRequest);
    expect(responseTwo.body).toHaveProperty('errorsMessages');
    expect(responseTwo.body.errorsMessages).toHaveLength(3);
  });

  it('❌ should not update a post without auth token', async () => {
    const post = await createPost(app);
    const response = await request(app)
      .put(`${POSTS_PATH}/${post.body.id}`)
      .send({
        title: 'Hello Backend',
        shortDescription: 'A blog about backend development',
      });

    expect(response.status).toBe(HttpStatus.Unauthorized);
  });

  it('❌ should not update a post by id with incorrect data', async () => {
    const post = await createPost(app);

    const invalidDataOne = {
      title: '',
      shortDescription: '',
      content: '',
      blogId: '',
    };

    const invalidDataTwo = {
      title: 'Hello Backend',
      shortDescription: 'A blog about backend development',
    };

    const responseOne = await request(app)
      .put(`${POSTS_PATH}/${post.body.id}`)
      .set('Authorization', adminToken)
      .send(invalidDataOne);

    const responseTwo = await request(app)
      .put(`${POSTS_PATH}/${post.body.id}`)
      .set('Authorization', adminToken)
      .send(invalidDataTwo);

    expect(responseOne.status).toBe(HttpStatus.BadRequest);
    expect(responseOne.body).toHaveProperty('errorsMessages');
    expect(responseOne.body.errorsMessages).toHaveLength(4);

    expect(responseTwo.status).toBe(HttpStatus.BadRequest);
    expect(responseTwo.body).toHaveProperty('errorsMessages');
    expect(responseTwo.body.errorsMessages).toHaveLength(2);
  });

  it('should not update a post with non-existent id', async () => {
    const post = await createPost(app);
    const updatedPost = {
      title: 'Updated Title',
      shortDescription: 'Updated description',
      content: 'Updated content here',
      blogId: post.body.blogId,
    };
    const response = await request(app)
      .put(`${POSTS_PATH}/507f1f77bcf86cd799439011`)
      .set('Authorization', adminToken)
      .send(updatedPost);

    expect(response.status).toBe(HttpStatus.NotFound);
  });

  it('should not delete a post with non-existent id', async () => {
    const response = await request(app)
      .delete(`${POSTS_PATH}/507f1f77bcf86cd799439011`)
      .set('Authorization', adminToken);

    expect(response.status).toBe(HttpStatus.NotFound);
  });

  it('❌ should not delete a post without auth token', async () => {
    const post = await createPost(app);
    const response = await request(app).delete(`${POSTS_PATH}/${post.body.id}`);
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });
});
