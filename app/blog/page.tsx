'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '@/store/slices/postsSlice';
import { RootState } from '@/store';
import PostCard from '@/components/blog/PostCard';

export default function BlogPage() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-center mb-12 gradient-text">All Blog Posts</h1>
      {loading ? (
        <div className="text-center py-12">Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}