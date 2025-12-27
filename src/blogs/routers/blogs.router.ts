import { Router } from 'express';
import { getAllBlogsHandler } from './handlers/get-all-blogs.handler';
import {
  paramBlogIdValidationMiddleware,
  paramIdValidationMiddleware,
} from '../../core/validation/param-id-validation-middleware';
import { inputResultValidationMiddleware } from '../../core/validation/input-result.validation-middleware';
import { createBlogHandler } from './handlers/create-blog.handler';
import { adminGuardMiddleware } from '../../auth/middlewares/admin.duard-middleware';
import { blogInputValidationMiddleware } from '../validation/blog-input.validation-middleware';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { getOneBlogHandler } from './handlers/get-one-blog.handler';
import { getBlogPostsHandler } from './handlers/get-blog-posts.handler';
import { createBlogPostHandler } from './handlers/create-blog-post.handler';
import { paginationAndSortingValidation } from '../../core/validation/query-pagination-sorting-validation.middleware';
import { BlogSortFieldEnum } from './input/blogs-sort-field';
import { blogPostInputValidationMiddleware } from '../../posts/validation/post-input.validation-middleware';
import { PostSortFieldEnum } from '../../posts/routers/input/post-sort-field';
import { query } from 'express-validator';

export const blogsRouter = Router({});

blogsRouter
  .get(
    '/',
    paginationAndSortingValidation(BlogSortFieldEnum),
    query('searchNameTerm').optional().isString().trim(),
    inputResultValidationMiddleware,
    getAllBlogsHandler,
  )
  .get(
    '/:id',
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    getOneBlogHandler,
  )
  .get(
    '/:blogId/posts',
    paramBlogIdValidationMiddleware,
    paginationAndSortingValidation(PostSortFieldEnum),
    inputResultValidationMiddleware,
    getBlogPostsHandler,
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
    paramBlogIdValidationMiddleware,
    blogPostInputValidationMiddleware,
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
