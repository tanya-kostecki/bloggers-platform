import { Post } from '../types/post';
import { PostDto } from '../application/dto/post.dto';
import { ObjectId, WithId } from 'mongodb';
import { postsCollection } from '../../db/mongo.db';

export class PostsRepository {
  async findAll(): Promise<WithId<Post>[]> {
    return postsCollection.find().toArray();
  }

  async findOne(id: string): Promise<WithId<Post> | null> {
    return postsCollection.findOne({ _id: new ObjectId(id) });
  }

  async findByBlogId(blogId: string): Promise<WithId<Post>[]> {
    return postsCollection.find({ blogId }).toArray();
  }

  async create(post: Post): Promise<string> {
    const insertedResult = await postsCollection.insertOne(post);
    return insertedResult.insertedId.toString();
  }

  async update(id: string, dto: PostDto): Promise<void> {
    await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          id,
        },
      },
    );
    return;
  }

  async delete(id: string): Promise<void> {
    await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return;
  }
}
