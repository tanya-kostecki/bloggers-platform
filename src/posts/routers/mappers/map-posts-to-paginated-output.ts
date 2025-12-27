import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostListPaginatedOutput } from '../output/post-list-paginated-output';
import { mapPostToViewModel } from './map-to-post-view-model';

export const mapToPostsToPaginatedOutput = (
  posts: WithId<Post>[],
  meta: { pageNumber: number; pagesSize: number; totalCount: number },
): PostListPaginatedOutput => {
  return {
    page: meta.pageNumber,
    pagesSize: meta.pagesSize,
    pagesCount: Math.ceil(meta.totalCount / meta.pagesSize),
    totalCount: meta.totalCount,
    items: posts.map(mapPostToViewModel),
  };
};