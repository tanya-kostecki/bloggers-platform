import { Post } from '../types/post';
import { PostInputModel } from '../dto/post-input-model';
import { ObjectId, WithId } from 'mongodb';
import { postsCollection } from '../../db/mongo.db';

export const postsRepository = {
  findAll: async (): Promise<WithId<Post>[]> => {
    return postsCollection.find().toArray();
  },
  findOne: async (id: string): Promise<WithId<Post> | null> => {
    return postsCollection.findOne({ _id: new ObjectId(id) });
  },
  create: async (post: Post): Promise<WithId<Post>> => {
    const insertedResult = await postsCollection.insertOne(post);
    return { ...post, _id: insertedResult.insertedId };
  },
  update: async (id: string, dto: PostInputModel): Promise<void> => {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      throw new Error('Blog not found');
    }

    const updatedResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          id: id,
        },
      },
    );

    if (updatedResult.modifiedCount < 1) {
      throw new Error('Blog not found');
    }

    return;
  },
  delete: async (id: string): Promise<void> => {
    const deletedResult = await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deletedResult.deletedCount < 1) {
      throw new Error('Blog not found');
    }
    return;
  },
};
