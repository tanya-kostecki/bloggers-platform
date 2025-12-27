import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { BlogsQueryInput } from '../input/blogs-query-input';
import { mapToBlogsToPaginatedOutput } from '../mappers/map-blogs-to-paginated-output';

export const getAllBlogsHandler = async (
  req: Request<{}, {}, {}, BlogsQueryInput>,
  res: Response,
) => {
  try {
    const query = req.query;
    const { items, totalCount } = await blogsService.findAll(query);
    const blogPaginatedOutput = mapToBlogsToPaginatedOutput(items, {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).send(blogPaginatedOutput);
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
