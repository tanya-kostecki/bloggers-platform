import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { BlogsQueryInput } from '../input/blogs-query-input';
import { mapToBlogsToPaginatedOutput } from '../mappers/map-blogs-to-paginated-output';
import { matchedData } from 'express-validator';

export const getAllBlogsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const query = matchedData(req) as BlogsQueryInput;
    const { items, totalCount } = await blogsService.findAll(query);
    const blogPaginatedOutput = mapToBlogsToPaginatedOutput(items, {
      pageNumber: query.pageNumber,
      pagesSize: query.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).send(blogPaginatedOutput);
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
