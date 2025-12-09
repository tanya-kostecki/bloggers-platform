import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { postsService } from '../../../posts/application/posts.service';
import { mapPostToViewModel } from '../../../posts/routers/mappers/mapt-to-post-view-model';

export const getBlogPosts = async (
  req: Request<{ blogId: string }>,
  res: Response,
) => {
  try {
    const blog = await blogsService.findOneOrFail(req.params.blogId);
    const blogPosts = await postsService.findByBlogId(blog._id.toString());
    const blogPostsViewModel = blogPosts.map(mapPostToViewModel);
    res.status(HttpStatus.Ok).send(blogPostsViewModel);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
