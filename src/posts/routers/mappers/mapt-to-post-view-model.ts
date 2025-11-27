import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostViewModel } from '../../types/post-view-model';

export const mapPostToViewModel = (post: WithId<Post>): PostViewModel => {
  return {
    ...post,
    id: post._id.toString(),
  };
};
