import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';
import { mapPostToViewModel } from '../mappers/mapt-to-post-view-model';

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

    const postViewModel = mapPostToViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
