import { WithId } from 'mongodb';
import { Blog } from '../types/blog';
import { BlogDto } from './dto/blog.dto';
import { BlogsRepository } from '../repositories/blogs.repository';
import { NotFoundError } from '../../core/errors/not-found.error';

export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async findAll(): Promise<WithId<Blog>[]> {
    return this.blogsRepository.findAll();
  }

  async findOne(id: string): Promise<WithId<Blog> | null> {
    return this.blogsRepository.findOne(id);
  }

  async findOneOrFail(id: string): Promise<WithId<Blog>> {
    const blog = await this.blogsRepository.findOne(id);

    if (!blog) {
      throw new NotFoundError('Blog not found');
    }
    return blog;
  }

  async create(dto: BlogDto): Promise<string> {
    const newBlog: Blog = {
      ...dto,
      createdAt: new Date(),
      isMembership: false,
    };

    return this.blogsRepository.create(newBlog);
  }

  async update(id: string, dto: BlogDto): Promise<void> {
    await this.findOneOrFail(id);
    await this.blogsRepository.update(id, dto);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.findOneOrFail(id);
    await this.blogsRepository.delete(id);
    return;
  }
}

export const blogsService = new BlogsService(new BlogsRepository());
