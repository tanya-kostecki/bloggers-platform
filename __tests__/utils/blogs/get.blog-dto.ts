import { BlogInputModel } from '../../../src/blogs/dto/blog-input-model';

export const getBlogDto = (): BlogInputModel => {
  return {
    name: 'Tech Insights',
    description: 'A blog about the latest technology trends and innovations',
    websiteUrl: 'https://techinsights.example.com',
  };
};
