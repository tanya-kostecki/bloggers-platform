import { Collection, MongoClient } from 'mongodb';
import { Blog } from '../blogs/types/blog';
import { Post } from '../posts/types/post';
import { SETTINGS } from '../core/settings/settings';
import { BLOGS_COLLECTION, POSTS_COLLECTION } from './collection-names';

export let client: MongoClient;
export let blogsCollection: Collection<Blog>;
export let postsCollection: Collection<Post>;

export const runDB = async (url: string): Promise<void> => {
  client = new MongoClient(url);
  const db = client.db(SETTINGS.DB_NAME);

  blogsCollection = db.collection<Blog>(BLOGS_COLLECTION);
  postsCollection = db.collection<Post>(POSTS_COLLECTION);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    await client.close();
    throw new Error(`Database not connected: ${error}`);
  }
};

export const stopDB = async () => {
  if (!client) {
    throw new Error('MongoDB client does not exist');
  }
  await client.close();
};
