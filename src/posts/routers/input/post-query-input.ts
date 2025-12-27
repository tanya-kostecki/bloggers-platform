import { PaginationAndSorting } from '../../../core/types/pagination-and-sorting';
import { PostSortFieldEnum } from './post-sort-field';

export type PostsQueryInput = PaginationAndSorting<PostSortFieldEnum>;
