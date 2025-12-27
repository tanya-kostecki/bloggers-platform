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

  describe('Pagination and Sorting', () => {
    let testPosts: any[];

    beforeEach(async () => {
      await clearDatabase(app);
      testPosts = [];

      // Create posts with specific titles for testing
      const post1 = await createPost(app, { title: 'Alpha Post' });
      const post2 = await createPost(app, { title: 'Beta Post' });
      const post3 = await createPost(app, { title: 'Gamma Post' });
      const post4 = await createPost(app, { title: 'Delta Post' });
      const post5 = await createPost(app, { title: 'Epsilon Post' });

      testPosts = [post1, post2, post3, post4, post5];
    });

    it('should paginate posts with custom pageSize', async () => {
      const response = await request(app).get(`${POSTS_PATH}?pageSize=2`);

      expect(response.status).toBe(HttpStatus.Ok);
      expect(response.body.pageSize).toBe(2);
      expect(response.body.items).toHaveLength(2);
      expect(response.body.totalCount).toBe(5);
      expect(response.body.pagesCount).toBe(3);
    });

    it('should return second page of posts', async () => {
      const response = await request(app).get(
        `${POSTS_PATH}?pageSize=2&pageNumber=2`,
      );

      expect(response.status).toBe(HttpStatus.Ok);
      expect(response.body.page).toBe(2);
      expect(response.body.pageSize).toBe(2);
      expect(response.body.items).toHaveLength(2);
    });

    it('should sort posts by title ascending', async () => {
      const response = await request(app).get(
        `${POSTS_PATH}?sortBy=title&sortDirection=asc`,
      );

      expect(response.status).toBe(HttpStatus.Ok);
      expect(response.body.items[0].title).toBe('Alpha Post');
      expect(response.body.items[1].title).toBe('Beta Post');
    });

    it('should sort posts by title descending', async () => {
      const response = await request(app).get(
        `${POSTS_PATH}?sortBy=title&sortDirection=desc`,
      );

      expect(response.status).toBe(HttpStatus.Ok);
      expect(response.body.items[0].title).toBe('Gamma Post');
      expect(response.body.items[1].title).toBe('Epsilon Post');
    });

    it('should filter posts by searchTitleTerm', async () => {
      const response = await request(app).get(
        `${POSTS_PATH}?searchTitleTerm=Beta`,
      );

      expect(response.status).toBe(HttpStatus.Ok);
      expect(response.body.totalCount).toBe(1);
      expect(response.body.items[0].title).toBe('Beta Post');
    });

    it('should combine pagination, sorting, and search', async () => {
      // Create more posts for better testing
      await createPost(app, {
        title: 'Alpha Test',
        shortDescription: 'test description',
        content: 'this is the content for the post',
      });
      await createPost(app, {
        title: 'Alpha Dev',
        shortDescription: 'test description',
        content: 'this is the content for the post',
      });

      const response = await request(app).get(
        `${POSTS_PATH}?searchTitleTerm=Alpha&sortBy=title&sortDirection=asc&pageSize=2`,
      );

      expect(response.status).toBe(HttpStatus.Ok);
      expect(response.body.totalCount).toBe(3); // Alpha Post, Alpha Test, Alpha Dev
      expect(response.body.items).toHaveLength(2);
      expect(response.body.items[0].title).toBe('Alpha Dev');
      expect(response.body.items[1].title).toBe('Alpha Post');
    });
  });
});
