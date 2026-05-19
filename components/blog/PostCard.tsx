import Link from 'next/link';
import { Post } from '@/store/slices/postsSlice';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all p-6">
      <div className="flex gap-2 mb-3 flex-wrap">
        {post.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">#{tag}</span>
        ))}
      </div>
      <Link href={`/blog/${post.id}`}>
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.body}</p>
      <div className="flex justify-between items-center text-sm">
        <span>👁️ {post.views} views</span>
        <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">Read More →</Link>
      </div>
    </div>
  );
}