import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';
import { BlogListPaginatedOutput } from '../output/blog-list-paginated-output';

export const mapToBlogsToPaginatedOutput = (
  blogs: WithId<Blog>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): BlogListPaginatedOutput => {
  return {
    page: meta.pageNumber,
    pagesSize: meta.pageSize,
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    totalCount: meta.totalCount,
    items: blogs.map((blog) => ({
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    })),
  };
};
