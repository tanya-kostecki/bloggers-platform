import { Blog } from '../types/blog';
import { BlogDto } from '../application/dto/blog.dto';
import { ObjectId, WithId } from 'mongodb';
import { blogsCollection } from '../../db/mongo.db';
import { NotFoundError } from '../../core/errors/not-found.error';

export class BlogsRepository {
  async findAll(): Promise<WithId<Blog>[]> {
    return blogsCollection.find().toArray();
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
