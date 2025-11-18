import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { generateAuthToken } from '../../utils/generate-auth-token';
import { clearDatabase } from '../../utils/clearDatabase';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/paths';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { createPost } from '../../utils/posts/create-post';

describe('Posts API Validation', () => {
  const app = express();
  setupApp(app);

  const adminToken = generateAuthToken();

  beforeAll(async () => {
    await clearDatabase(app);
  });

  it('❌ should not create post without auth token', async () => {
    const response = await request(app)
      .post(POSTS_PATH)
      .send({ message: 'hacker' });
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });

  it('❌ should not create a post with invalid data; POST /api/blogs', async () => {
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
      blogId: '345',
    };

    const responseOne = await createPost(app, invalidDataOne);
    const responseTwo = await createPost(app, invalidDataTwo);

    expect(responseOne.status).toBe(HttpStatus.BadRequest);
    expect(responseOne.body).toHaveProperty('errorsMessages');
    expect(responseOne.body.errorsMessages).toHaveLength(4);

    expect(responseTwo.status).toBe(HttpStatus.BadRequest);
    expect(responseTwo.body).toHaveProperty('errorsMessages');
    expect(responseTwo.body.errorsMessages).toHaveLength(4);
  });

  it('❌ should not update a post with incorrect data and without token', async () => {
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

    const responseThree = await request(app)
      .put(`${POSTS_PATH}/${post.body.id}`)
      .send(invalidDataTwo);

    expect(responseOne.status).toBe(HttpStatus.BadRequest);
    expect(responseOne.body).toHaveProperty('errorsMessages');
    expect(responseOne.body.errorsMessages).toHaveLength(4);

    expect(responseTwo.status).toBe(HttpStatus.BadRequest);
    expect(responseTwo.body).toHaveProperty('errorsMessages');
    expect(responseTwo.body.errorsMessages).toHaveLength(2);

    expect(responseThree.status).toBe(HttpStatus.Unauthorized);
  });

  it('❌ should not delete a blog without auth token', async () => {
    const post = await createPost(app);
    const response = await request(app).delete(`${POSTS_PATH}/${post.body.id}`);
    expect(response.status).toBe(HttpStatus.Unauthorized);
  });
});
