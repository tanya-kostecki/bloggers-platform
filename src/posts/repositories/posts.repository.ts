import { Post } from '../types/post';
import { PostDto } from '../application/dto/post.dto';
import { Filter, ObjectId, WithId } from 'mongodb';
import { postsCollection } from '../../db/mongo.db';
import { PostsQueryInput } from '../routers/input/post-query-input';

export class PostsRepository {
  async findAll(
    query: PostsQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const { pageNumber, pageSize, searchPostTitleTerm, sortBy, sortDirection } =
      query;
    const skip = (pageNumber - 1) * pageSize;
    const filter: Filter<Post> = {};

    if (searchPostTitleTerm) {
      filter.$or = [];
      filter.$or.push({
        title: { $regex: searchPostTitleTerm, $options: 'i' },
      });
    }

    const items = await postsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await postsCollection.countDocuments(filter);
    return { items, totalCount };
  }

  async findOne(id: string): Promise<WithId<Post> | null> {
    return postsCollection.findOne({ _id: new ObjectId(id) });
  }

  async findByBlogId(
    blogId: string,
    query: PostsQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchPostTitleTerm } =
      query;
    const skip = (pageNumber - 1) * pageSize;
    const filter: Filter<Post> = {};

    if (searchPostTitleTerm) {
      filter.$or = [];
      filter.$or.push({
        title: { $regex: searchPostTitleTerm, $options: 'i' },
      });
    }

    const items = await postsCollection
      .find({ ...filter, blogId: blogId })
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await postsCollection.countDocuments({ ...filter, blogId: blogId });

    return { items, totalCount };
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
