import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const deleteBlogHandler = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const targetBlock = blogsRepository.findOne(req.params.id);

  if (!targetBlock) {
    return res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]));
  }

  blogsRepository.delete(targetBlock.id);
  return res.sendStatus(HttpStatus.NoContent);
};
