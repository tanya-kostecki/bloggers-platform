import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';
import { BlogViewModel } from '../../types/blog-view-model';

export const mapToBlogViewModel = (blog: WithId<Blog>): BlogViewModel => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};
