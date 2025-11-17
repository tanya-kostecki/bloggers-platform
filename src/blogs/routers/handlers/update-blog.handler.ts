import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { BlogInputModel } from '../../dto/blog-input-model';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const updateBlogHandler = (
  req: Request<{ id: string }, {}, BlogInputModel>,
  res: Response,
) => {
  const targetBlock = blogsRepository.findOne(req.params.id);

  if (!targetBlock) {
    return res
      .status(HttpStatus.NoContent)
      .send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]));
  }

  blogsRepository.update(targetBlock.id, req.body);
  res.sendStatus(HttpStatus.NoContent);
};
