import { PostInputModel } from '../../dto/post-input-model';
import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const updatePostHandler = async (
  req: Request<{ id: string }, {}, PostInputModel>,
  res: Response,
) => {
  try {
    const postForUpdate = await postsRepository.findOne(req.params.id);
    if (!postForUpdate) {
      return res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Post not found.' }]),
        );
    }

    await postsRepository.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
