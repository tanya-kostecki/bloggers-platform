import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { Blog } from '../../types/blog';
import { BlogInputModel } from '../../dto/blog-input-model';

export const createBlogHandler = (
  req: Request<{}, {}, BlogInputModel>,
  res: Response,
) => {
  const newBlock: Blog = {
    ...req.body,
    id: Date.now().toString(),
  };

  const block = blogsRepository.create(newBlock);
  res.status(HttpStatus.Created).send(block);
};
