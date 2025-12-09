import { WithId } from 'mongodb';
import { Post } from '../types/post';
import { PostsRepository } from '../repositories/posts.repository';
import { PostDto } from './dto/post.dto';

import { NotFoundError } from '../../core/errors/not-found.error';
import {
  blogsService,
  BlogsService,
} from '../../blogs/application/blogs.service';
import { CreatePostDto } from './dto/create-post.dto';

export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly blogsService: BlogsService,
  ) {}

  async findAll(): Promise<WithId<Post>[]> {
    return this.postsRepository.findAll();
  }

  async findOne(id: string): Promise<WithId<Post> | null> {
    return this.postsRepository.findOne(id);
  }

  async findOneOrFail(id: string): Promise<WithId<Post>> {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundError('Blog not found');
    }
    return post;
  }

  async findByBlogId(blogId: string): Promise<WithId<Post>[]> {
    return this.postsRepository.findByBlogId(blogId);
  }

  async create(dto: PostDto): Promise<string> {
    const blog = await this.blogsService.findOneOrFail(dto.blogId);

    const newPost: Post = {
      ...dto,
      createdAt: new Date(),
      blogName: blog.name,
    };

    return await this.postsRepository.create(newPost);
  }

  async createByBlogId(
    blogId: string,
    createPostDto: CreatePostDto,
  ): Promise<string> {
    const blog = await this.blogsService.findOneOrFail(blogId);

    const newPost: Post = {
      ...createPostDto,
      createdAt: new Date(),
      blogName: blog.name,
      blogId,
    };

    return await this.postsRepository.create(newPost);
  }

  async update(id: string, dto: PostDto): Promise<void> {
    await this.findOneOrFail(id);
    return this.postsRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findOneOrFail(id);
    return this.postsRepository.delete(id);
  }
}

export const postsService = new PostsService(
  new PostsRepository(),
  blogsService,
);
