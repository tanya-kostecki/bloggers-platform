import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const getOneBlogHandler = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const blog = blogsRepository.findOne(req.params.id);

  if (!blog) {
    return res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]));
  }

  return res.status(HttpStatus.Ok).send(blog);
};
