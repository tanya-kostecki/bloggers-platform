import { BlogViewModel } from '../../types/blog-view-model';

export type BlogListPaginatedOutput = {
  page: number;
  pagesSize: number;
  pagesCount: number;
  totalCount: number;
  items: BlogViewModel[];
};
