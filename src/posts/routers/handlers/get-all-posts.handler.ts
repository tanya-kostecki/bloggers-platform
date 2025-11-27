import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapPostToViewModel } from '../mappers/mapt-to-post-view-model';

export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postsRepository.findAll();
    const postViewModels = posts.map(mapPostToViewModel);
    res.status(HttpStatus.Ok).send(postViewModels);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
