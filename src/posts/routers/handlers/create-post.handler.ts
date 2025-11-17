import { Request, Response } from 'express';
import { PostInputModel } from '../../dto/post-input-model';
import { Post } from '../../types/post';
import { db } from '../../../db/in-memory.db';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';

export const createPostHandler = (
  req: Request<{}, {}, PostInputModel>,
  res: Response,
) => {
  const newPost: Post = {
    ...req.body,
    id: (db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1).toString(),
    blogName: 'Backend Developers',
  };

  const response = postsRepository.create(newPost);
  res.status(HttpStatus.Created).send(response);
};
