import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { BlogDto } from '../../application/dto/blog.dto';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { blogsService } from '../../application/blogs.service';

export const updateBlogHandler = async (
  req: Request<{ id: string }, {}, BlogDto>,
  res: Response,
) => {
  try {
    await blogsService.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
