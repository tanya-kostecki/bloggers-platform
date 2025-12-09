import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getAllBlogsHandler = async (req: Request, res: Response) => {
  try {
    const blogs = await blogsService.findAll();
    const blogViewModels = blogs.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send(blogViewModels);
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
