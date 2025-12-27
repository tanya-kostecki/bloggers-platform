import { PostViewModel } from '../../types/post-view-model';

export type PostListPaginatedOutput = {
  page: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  items: PostViewModel[];
};