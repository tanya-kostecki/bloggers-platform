import express, { Express } from 'express';
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from './core/paths/paths';
import { blogsRouter } from './blogs/routers/blogs.router';
import { testingRouter } from './testing/testing.router';
import { postsRouter } from './posts/routers/posts.router';

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(TESTING_PATH, testingRouter);
};
