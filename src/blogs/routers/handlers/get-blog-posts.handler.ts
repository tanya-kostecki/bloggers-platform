import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostsToPaginatedOutput } from '../../../posts/routers/mappers/map-posts-to-paginated-output';
import { PostsQueryInput } from '../../../posts/routers/input/post-query-input';
import { matchedData } from 'express-validator';

export const getBlogPostsHandler = async (
  req: Request<{ blogId: string }>,
  res: Response,
) => {
  try {
    const blog = await blogsService.findOneOrFail(req.params.blogId);

    const query = matchedData(req) as PostsQueryInput;
    const { items, totalCount } = await postsService.findByBlogId(
      blog._id.toString(),
      query,
    );

    const blogPaginatedOutput = mapToPostsToPaginatedOutput(items, {
      pageNumber: query.pageNumber,
      pagesSize: query.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).send(blogPaginatedOutput);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
