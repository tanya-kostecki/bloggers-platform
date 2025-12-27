import { BlogDto } from '../../../src/blogs/application/dto/blog.dto';

export const getBlogDto = (): BlogDto => {
  return {
    name: 'Tech Insights',
    description: 'A blog about the latest technology trends and innovations',
    websiteUrl: 'https://techinsights.example.com',
  };
};
