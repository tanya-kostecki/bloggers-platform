import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { mapPostToViewModel } from '../mappers/mapt-to-post-view-model';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getOnePostHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const post = await postsService.findOneOrFail(req.params.id);
    const postViewModel = mapPostToViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
