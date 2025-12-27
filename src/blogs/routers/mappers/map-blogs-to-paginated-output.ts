import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';
import { BlogListPaginatedOutput } from '../output/blog-list-paginated-output';
import { mapToBlogViewModel } from './map-to-blog-view-model';

export const mapToBlogsToPaginatedOutput = (
  blogs: WithId<Blog>[],
  meta: { pageNumber: number; pagesSize: number; totalCount: number },
): BlogListPaginatedOutput => {
  return {
    page: meta.pageNumber,
    pagesSize: meta.pagesSize,
    pagesCount: Math.ceil(meta.totalCount / meta.pagesSize),
    totalCount: meta.totalCount,
    items: blogs.map(mapToBlogViewModel),
  };
};
