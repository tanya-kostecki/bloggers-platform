import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';

export const deleteBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = req.params.id;
    const targetBlock = await blogsRepository.findOne(id);

    if (!targetBlock) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Blog not found' }]),
        );
      return;
    }

    await blogsRepository.delete(id);
    return res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
