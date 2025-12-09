import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { postsService } from '../../../posts/application/posts.service';
import { CreatePostDto } from '../../../posts/application/dto/create-post.dto';
import { mapPostToViewModel } from '../../../posts/routers/mappers/mapt-to-post-view-model';

export const createBlogPostHandler = async (
  req: Request<{ blogId: string }, {}, CreatePostDto>,
  res: Response,
) => {
  try {
    const createdPostId = await postsService.createByBlogId(
      req.params.blogId,
      req.body,
    );

    const createdPost = await postsService.findOneOrFail(createdPostId);

    const postViewModel = mapPostToViewModel(createdPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
