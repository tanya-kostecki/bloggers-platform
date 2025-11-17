import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const deletePostHandler = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const postToDelete = postsRepository.findOne(req.params.id);
  if (!postToDelete) {
    return res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));
  }

  postsRepository.delete(postToDelete.id);
  return res.sendStatus(HttpStatus.NoContent);
};
