import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { BlogsQueryInput } from '../input/blogs-query-input';
import { mapToBlogsToPaginatedOutput } from '../mappers/map-blogs-to-paginated-output';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-defaut-pagination-and-sorting';

export const getAllBlogsHandler = async (req: Request, res: Response) => {
  try {
    const query = matchedData(req, {
      locations: ['query'],
      includeOptionals: true,
    }) as BlogsQueryInput;

    const queryInput = setDefaultSortAndPaginationIfNotExist(query);
    const { items, totalCount } = await blogsService.findAll(queryInput);

    const blogPaginatedOutput = mapToBlogsToPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).send(blogPaginatedOutput);
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
