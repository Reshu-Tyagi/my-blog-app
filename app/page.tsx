'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchPostsRequest } from '@/store/slices/postsSlice';
import { RootState } from '@/store';
import PostCard from '@/components/blog/PostCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsRequest());
    }
  }, [dispatch, posts.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Blogify</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Share Your Ideas</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Discover. Learn. Get Inspired. Explore insightful articles on technology, lifestyle, productivity and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog"><button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Explore Blogs</button></Link>
            <Link href="/signup"><button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">Start Writing</button></Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Posts</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-16 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-bold">500+</div><div>Articles</div></div>
            <div><div className="text-4xl font-bold">10K+</div><div>Readers</div></div>
            <div><div className="text-4xl font-bold">50+</div><div>Writers</div></div>
            <div><div className="text-4xl font-bold">120+</div><div>Topics</div></div>
          </div>
        </div>
      </section>
    </>
  );
}