import { Router } from 'express';
import { getAllPostsHandler } from './handlers/get-all-posts.handler';
import { paramIdValidationMiddleware } from '../../core/validation/param-id-validation-middleware';
import { inputResultValidationMiddleware } from '../../core/validation/input-result.validation-middleware';
import { getOnePostHandler } from './handlers/get-one-post.handler';
import { adminGuardMiddleware } from '../../auth/middlewares/admin.duard-middleware';
import { createBlogHandler } from '../../blogs/routers/handlers/create-blog.handler';
import { updatePostHandler } from './handlers/update-post.handler';
import { postInputValidationMiddleware } from '../validation/post-input.validation-middleware';
import { deletePostHandler } from './handlers/delete-post.handler';

export const postsRouter = Router({});

postsRouter
  .get('/', getAllPostsHandler)
  .get(
    '/:id',
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    getOnePostHandler,
  )
  .post(
    '/',
    adminGuardMiddleware,
    postInputValidationMiddleware,
    inputResultValidationMiddleware,
    createBlogHandler,
  )
  .put(
    '/:id',
    adminGuardMiddleware,
    paramIdValidationMiddleware,
    postInputValidationMiddleware,
    inputResultValidationMiddleware,
    updatePostHandler,
  )
  .delete(
    '/:id',
    adminGuardMiddleware,
    paramIdValidationMiddleware,
    inputResultValidationMiddleware,
    deletePostHandler,
  );
