import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostListPaginatedOutput } from '../output/post-list-paginated-output';

export const mapToPostsToPaginatedOutput = (
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): PostListPaginatedOutput => {
  return {
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    pageCount: Math.ceil(meta.totalCount / meta.pageSize),
    totalCount: meta.totalCount,
    items: posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt,
    })),
  };
};