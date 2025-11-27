import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';

export const getAllBlogsHandler = async (req: Request, res: Response) => {
  try {
    const blogs = await blogsRepository.findAll();
    const blogViewModels = blogs.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send(blogViewModels);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
