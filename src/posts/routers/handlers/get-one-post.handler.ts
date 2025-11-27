import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const getOnePostHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const post = await postsRepository.findOne(req.params.id);

    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Post not found.' }]),
        );
      return;
    }

    res.status(HttpStatus.Ok).send(post);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
