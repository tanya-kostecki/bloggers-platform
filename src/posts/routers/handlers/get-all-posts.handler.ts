import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { PostsQueryInput } from '../input/post-query-input';
import { mapToPostsToPaginatedOutput } from '../mappers/map-posts-to-paginated-output';
import { matchedData } from 'express-validator';

export const getAllPostsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const query = matchedData(req) as PostsQueryInput;
    const { items, totalCount } = await postsService.findAll(query);
    const postPaginatedOutput = mapToPostsToPaginatedOutput(items, {
      pageNumber: query.pageNumber,
      pagesSize: query.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).send(postPaginatedOutput);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
