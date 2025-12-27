import { BlogSortFieldEnum } from './blogs-sort-field';
import { PaginationAndSorting } from '../../../core/types/pagination-and-sorting';

export type BlogsQueryInput = PaginationAndSorting<BlogSortFieldEnum> &
  Partial<{
    searchBlogNameTerm: string;
    searchWebsiteUrlTerm: string;
  }>;
