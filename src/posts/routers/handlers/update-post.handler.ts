import { PostInputModel } from '../../dto/post-input-model';
import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const updatePostHandler = (
  req: Request<{ id: string }, {}, PostInputModel>,
  res: Response,
) => {
  const postForUpdate = postsRepository.findOne(req.params.id);
  if (!postForUpdate) {
    return res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found.' }]));
  }

  postsRepository.update(postForUpdate.id, req.body);
  return res.sendStatus(HttpStatus.NoContent);
};
