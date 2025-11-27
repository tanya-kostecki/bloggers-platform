import { Blog } from '../types/blog';
import { BlogInputModel } from '../dto/blog-input-model';
import { ObjectId, WithId } from 'mongodb';
import { blogsCollection } from '../../db/mongo.db';

export const blogsRepository = {
  findAll: async (): Promise<WithId<Blog>[]> => {
    return blogsCollection.find().toArray();
  },
  findOne: async (id: string): Promise<WithId<Blog> | null> => {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  create: async (blog: Blog): Promise<WithId<Blog>> => {
    const insertedResult = await blogsCollection.insertOne(blog);
    return { ...blog, _id: insertedResult.insertedId };
  },
  update: async (id: string, dto: BlogInputModel): Promise<void> => {
    const updatedResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );

    if (updatedResult.modifiedCount < 1) {
      throw new Error('Blog does not exist');
    }

    return;
  },
  delete: async (id: string): Promise<void> => {
    const deletedResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deletedResult.deletedCount < 1) {
      throw new Error('Blog does not exist');
    }
    return;
  },
};
