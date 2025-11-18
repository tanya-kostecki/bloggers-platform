import { PostInputModel } from '../../../src/posts/dto/post-input-model';

export const getPostDto = (blogId: string): PostInputModel => {
  return {
    title: 'The Future',
    shortDescription:
      'Exploring the latest developments in artificial intelligence',
    content:
      'Artificial intelligence continues to evolve at a rapid pace. In this post, we explore the cutting-edge developments that are shaping the future of AI technology, from large language models to autonomous systems.',
    blogId,
  };
};
