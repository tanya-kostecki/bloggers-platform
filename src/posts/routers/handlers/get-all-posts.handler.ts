import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapPostToViewModel } from '../mappers/mapt-to-post-view-model';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postsService.findAll();
    const postViewModels = posts.map(mapPostToViewModel);
    res.status(HttpStatus.Ok).send(postViewModels);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
