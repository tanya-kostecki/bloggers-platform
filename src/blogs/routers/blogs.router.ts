import { Router } from 'express';
import { getAllBlogsHandler } from './handlers/get-all-blogs.handler';
import { paramIdValidationMiddleware } from '../../core/validation/param-id-validation-middleware';
import { inputResultValidationMiddleware } from '../../core/validation/input-result.validation-middleware';
import { createBlogHandler } from './handlers/create-blog.handler';
import { adminGuardMiddleware } from '../../auth/middlewares/admin.duard-middleware';
import { blogInputValidationMiddleware } from '../validation/blog-input.validation-middleware';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { getOneBlogHandler } from './handlers/get-one-blog.handler';
import { getBlogPosts } from './handlers/get-blog-posts';
import { createBlogPostHandler } from './handlers/create-blog-post';

export const blogsRouter = Router({});

blogsRouter
  .get('/', getAllBlogsHandler)
  .get(
    '/:id',
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    getOneBlogHandler,
  )
  .get(
    '/:blogId/posts',
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    getBlogPosts,
  )
  .post(
    '/',
    adminGuardMiddleware,
    blogInputValidationMiddleware,
    inputResultValidationMiddleware,
    createBlogHandler,
  )
  .post(
    '/:blogId/posts',
    adminGuardMiddleware,
    blogInputValidationMiddleware,
    inputResultValidationMiddleware,
    createBlogPostHandler,
  )
  .put(
    '/:id',
    adminGuardMiddleware,
    paramIdValidationMiddleware,
    blogInputValidationMiddleware,
    inputResultValidationMiddleware,
    updateBlogHandler,
  )
  .delete(
    '/:id',
    adminGuardMiddleware,
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    deleteBlogHandler,
  );
