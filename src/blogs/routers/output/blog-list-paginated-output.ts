import { Blog } from '../../types/blog';

export type BlogListPaginatedOutput = {
  page: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  items: Blog[];
};
