import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { BlogInputModel } from '../../dto/blog-input-model';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const updateBlogHandler = async (
  req: Request<{ id: string }, {}, BlogInputModel>,
  res: Response,
) => {
  try {
    const targetBlock = await blogsRepository.findOne(req.params.id);

    if (!targetBlock) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Blog not found' }]),
        );
      return;
    }

    await blogsRepository.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
