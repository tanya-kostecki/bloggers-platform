import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { Blog } from '../../types/blog';
import { BlogInputModel } from '../../dto/blog-input-model';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';

export const createBlogHandler = async (
  req: Request<{}, {}, BlogInputModel>,
  res: Response,
) => {
  try {
    const newBlock: Blog = {
      ...req.body,
      createdAt: new Date(),
      isMembership: false,
    };

    const block = await blogsRepository.create(newBlock);
    const blockViewModel = mapToBlogViewModel(block);
    res.status(HttpStatus.Created).send(blockViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
