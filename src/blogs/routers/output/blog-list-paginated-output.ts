import { Blog } from '../../types/blog';

export type BlogListPaginatedOutput = {
  page: number;
  pagesSize: number;
  pagesCount: number;
  totalCount: number;
  items: Blog[];
};
