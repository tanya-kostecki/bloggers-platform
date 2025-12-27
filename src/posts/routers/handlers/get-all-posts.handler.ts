import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { PostsQueryInput } from '../input/post-query-input';
import { mapToPostsToPaginatedOutput } from '../mappers/map-posts-to-paginated-output';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-defaut-pagination-and-sorting';

export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const query = matchedData(req, {
      locations: ['query'],
      includeOptionals: true,
    }) as PostsQueryInput;
    const queryInput = setDefaultSortAndPaginationIfNotExist(query);
    const { items, totalCount } = await postsService.findAll(queryInput);
    const postPaginatedOutput = mapToPostsToPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).send(postPaginatedOutput);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
