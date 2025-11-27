import { Request, Response } from 'express';
import { PostInputModel } from '../../dto/post-input-model';
import { Post } from '../../types/post';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/createErrorMessages';
import { mapPostToViewModel } from '../mappers/mapt-to-post-view-model';

export const createPostHandler = async (
  req: Request<{}, {}, PostInputModel>,
  res: Response,
) => {
  try {
    const blog = await blogsRepository.findOne(req.body.blogId);
    if (!blog) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([
            { field: 'blogId', message: 'Blog ID not found' },
          ]),
        );
      return;
    }
    const newPost: Post = {
      ...req.body,
      createdAt: new Date(),
      blogName: blog.name,
    };

    const result = await postsRepository.create(newPost);
    const postViewModel = mapPostToViewModel(result);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
