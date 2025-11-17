import { Blog } from '../blogs/types/blog';
import { Post } from '../posts/types/post';

export const db: {
  blogs: Blog[];
  posts: Post[];
} = {
  blogs: [
    {
      id: '1',
      name: 'Tech Insights',
      description: 'A blog about the latest technology trends and innovations',
      websiteUrl: 'https://techinsights.example.com',
    },
    {
      id: '2',
      name: 'Travel Adventures',
      description: 'Exploring the world one destination at a time',
      websiteUrl: 'https://traveladventures.example.com',
    },
    {
      id: '3',
      name: 'Foodie Chronicles',
      description: 'Delicious recipes and culinary experiences from around the globe',
      websiteUrl: 'https://foodiechronicles.example.com',
    },
  ],
  posts: [
    // Posts for Tech Insights (blogId: '1')
    {
      id: '1',
      title: 'The Future of AI in 2025',
      shortDescription: 'Exploring the latest developments in artificial intelligence',
      content:
        'Artificial intelligence continues to evolve at a rapid pace. In this post, we explore the cutting-edge developments that are shaping the future of AI technology, from large language models to autonomous systems.',
      blogId: '1',
      blogName: 'Tech Insights',
    },
    {
      id: '2',
      title: 'Understanding Quantum Computing',
      shortDescription: 'A beginner-friendly guide to quantum computers',
      content:
        'Quantum computing represents a paradigm shift in how we process information. This article breaks down the complex concepts into digestible pieces, making quantum computing accessible to everyone.',
      blogId: '1',
      blogName: 'Tech Insights',
    },
    {
      id: '3',
      title: 'Cybersecurity Best Practices',
      shortDescription: 'Essential tips to protect your digital life',
      content:
        'In an increasingly connected world, cybersecurity is more important than ever. Learn about the best practices to keep your data safe, from strong passwords to two-factor authentication.',
      blogId: '1',
      blogName: 'Tech Insights',
    },
    // Posts for Travel Adventures (blogId: '2')
    {
      id: '4',
      title: 'Hidden Gems of Kyoto',
      shortDescription: 'Discovering the lesser-known temples and gardens',
      content:
        'Beyond the famous Fushimi Inari and Kinkaku-ji, Kyoto holds countless hidden treasures. Join us as we explore secret gardens, quiet temples, and traditional neighborhoods off the beaten path.',
      blogId: '2',
      blogName: 'Travel Adventures',
    },
    {
      id: '5',
      title: 'Backpacking Through Patagonia',
      shortDescription: 'An epic journey through South America\'s wilderness',
      content:
        'Patagonia offers some of the most breathtaking landscapes on Earth. This detailed guide covers everything you need to know about planning your backpacking adventure through this stunning region.',
      blogId: '2',
      blogName: 'Travel Adventures',
    },
    {
      id: '6',
      title: 'European Train Travel Guide',
      shortDescription: 'Navigating Europe by rail like a pro',
      content:
        'Train travel in Europe is efficient, scenic, and eco-friendly. Learn how to plan your routes, save money with rail passes, and make the most of your European railway adventure.',
      blogId: '2',
      blogName: 'Travel Adventures',
    },
    // Posts for Foodie Chronicles (blogId: '3')
    {
      id: '7',
      title: 'Mastering Homemade Pasta',
      shortDescription: 'The art of creating fresh pasta from scratch',
      content:
        'There\'s nothing quite like fresh homemade pasta. In this comprehensive guide, we walk you through the process of making pasta dough, shaping different varieties, and creating the perfect sauce pairings.',
      blogId: '3',
      blogName: 'Foodie Chronicles',
    },
    {
      id: '8',
      title: 'Street Food of Southeast Asia',
      shortDescription: 'A culinary tour through Bangkok, Hanoi, and beyond',
      content:
        'Southeast Asian street food is an explosion of flavors and aromas. From pad thai to pho, we explore the must-try dishes and the stories behind them in this gastronomic journey.',
      blogId: '3',
      blogName: 'Foodie Chronicles',
    },
    {
      id: '9',
      title: 'The Perfect Sourdough Bread',
      shortDescription: 'Tips and tricks for artisan bread baking at home',
      content:
        'Baking sourdough bread is both an art and a science. This detailed tutorial covers starter maintenance, fermentation techniques, and baking methods to help you achieve that perfect crust and crumb.',
      blogId: '3',
      blogName: 'Foodie Chronicles',
    },
  ],
};