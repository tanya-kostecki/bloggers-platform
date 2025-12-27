import { PostDto } from '../../application/dto/post.dto';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const updatePostHandler = async (
  req: Request<{ id: string }, {}, PostDto>,
  res: Response,
) => {
  try {
    await postsService.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
