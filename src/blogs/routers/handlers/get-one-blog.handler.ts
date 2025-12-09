import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getOneBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const blog = await blogsService.findOneOrFail(req.params.id);
    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
