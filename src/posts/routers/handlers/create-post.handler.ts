import { Request, Response } from 'express';
import { PostDto } from '../../application/dto/post.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapPostToViewModel } from '../mappers/map-to-post-view-model';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const createPostHandler = async (
  req: Request<{}, {}, PostDto>,
  res: Response,
) => {
  try {
    const createdPostId = await postsService.create(req.body);
    const createdPost = await postsService.findOneOrFail(createdPostId);
    const postViewModel = mapPostToViewModel(createdPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
