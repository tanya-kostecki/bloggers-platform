import { Request, Response } from 'express';
import { PostInputModel } from '../../dto/post-input-model';
import { Post } from '../../types/post';
import { db } from '../../../db/in-memory.db';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const createPostHandler = (
  req: Request<{}, {}, PostInputModel>,
  res: Response,
) => {
  const blogId = blogsRepository.findOne(req.body.blogId);
  if (!blogId) {
    return res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([
          { field: 'blogId', message: 'Blog ID not found' },
        ]),
      );
  }
  const newPost: Post = {
    ...req.body,
    id: (db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1).toString(),
    blogName: 'Backend Developers',
  };

  const response = postsRepository.create(newPost);
  return res.status(HttpStatus.Created).send(response);
};
