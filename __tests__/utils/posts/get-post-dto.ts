import { PostDto } from '../../../src/posts/application/dto/post.dto';

export const getPostDto = (blogId: string): PostDto => {
  return {
    title: 'The Future',
    shortDescription:
      'Exploring the latest developments in artificial intelligence',
    content:
      'Artificial intelligence continues to evolve at a rapid pace. In this post, we explore the cutting-edge developments that are shaping the future of AI technology, from large language models to autonomous systems.',
    blogId,
  };
};
