import { db } from '../../db/in-memory.db';
import { Blog } from '../types/blog';
import { BlogInputModel } from '../dto/blog-input-model';

export const blogsRepository = {
  findAll: () => {
    return db.blogs;
  },
  findOne: (id: string) => {
    return db.blogs.find((blog) => blog.id === id) ?? null;
  },
  create: (blog: Blog) => {
    db.blogs.push(blog);
    return blog;
  },
  update: (id: string, dto: BlogInputModel) => {
    const blog = db.blogs.find((blog) => blog.id === id);

    if (!blog) {
      throw new Error('Blog not found');
    }

    blog.description = dto.description;
    blog.name = dto.name;
    blog.websiteUrl = dto.websiteUrl;

    return true;
  },
  delete: (id: string) => {
    db.blogs = db.blogs.filter((blog) => blog.id !== id);
    return true;
  },
};
