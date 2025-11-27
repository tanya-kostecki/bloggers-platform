import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';

export const getOneBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const blog = await blogsRepository.findOne(req.params.id);

    if (!blog) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Blog not found' }]),
        );
      return;
    }

    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
