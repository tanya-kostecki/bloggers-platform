import { PostViewModel } from '../../types/post-view-model';

export type PostListPaginatedOutput = {
  page: number;
  pagesSize: number;
  pagesCount: number;
  totalCount: number;
  items: PostViewModel[];
};