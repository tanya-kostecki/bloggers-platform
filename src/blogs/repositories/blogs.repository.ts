import { Blog } from '../types/blog';
import { BlogDto } from '../application/dto/blog.dto';
import { Filter, ObjectId, WithId } from 'mongodb';
import { blogsCollection } from '../../db/mongo.db';
import { BlogsQueryInput } from '../routers/input/blogs-query-input';

export class BlogsRepository {
  async findAll(
    query: BlogsQueryInput,
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchBlogNameTerm,
      searchWebsiteUrlTerm,
    } = query;
    const skip = (pageNumber - 1) * pageSize;
    const filter: Filter<Blog> = {};

    if (searchBlogNameTerm || searchWebsiteUrlTerm) {
      filter.$or = [];
      if (searchBlogNameTerm) {
        filter.$or.push({
          name: { $regex: searchBlogNameTerm, $options: 'i' },
        });
      }
      if (searchWebsiteUrlTerm) {
        filter.$or.push({
          websiteUrl: { $regex: searchWebsiteUrlTerm, $options: 'i' },
        });
      }
    }

    const items = await blogsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await blogsCollection.countDocuments(filter);

    return { items, totalCount };
  }

  async findOne(id: string): Promise<WithId<Blog> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  }

  async create(blog: Blog): Promise<string> {
    const insertedResult = await blogsCollection.insertOne(blog);
    return insertedResult.insertedId.toString();
  }

  async update(id: string, dto: BlogDto): Promise<void> {
    await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );

    return;
  }

  async delete(id: string): Promise<void> {
    await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return;
  }
}
