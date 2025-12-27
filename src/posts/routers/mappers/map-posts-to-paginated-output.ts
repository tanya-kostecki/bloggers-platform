import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostListPaginatedOutput } from '../output/post-list-paginated-output';
import { mapPostToViewModel } from './map-to-post-view-model';

export const mapToPostsToPaginatedOutput = (
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): PostListPaginatedOutput => {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: posts.map(mapPostToViewModel),
  };
};