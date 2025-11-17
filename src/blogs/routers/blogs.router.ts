import { Router } from 'express';
import { getAllBlogsHandler } from './handlers/get-all-blogs.handler';
import { paramIdValidationMiddleware } from '../../core/validation/param-id-validation-middleware';
import { inputResultValidationMiddleware } from '../../core/validation/input-result.validation-middleware';
import { createBlogHandler } from './handlers/create-blog.handler';
import { adminGuardMiddleware } from '../../auth/middlewares/admin.duard-middleware';
import { blogInputValidationMiddleware } from '../validation/blog-input.validation-middleware';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { getOneBlogHandler } from './handlers/get-one-block.handler';

export const blogsRouter = Router({});

blogsRouter
  .get('/', getAllBlogsHandler)
  .get(
    '/:id',
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    getOneBlogHandler,
  )
  .post(
    '/',
    adminGuardMiddleware,
    blogInputValidationMiddleware,
    inputResultValidationMiddleware,
    createBlogHandler,
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
