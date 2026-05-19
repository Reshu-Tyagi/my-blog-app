'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostByIdRequest } from '@/store/slices/postsSlice';
import { RootState } from '@/store';

export default function BlogDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostByIdRequest(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <div className="container-custom py-12 text-center">Loading...</div>;
  if (!currentPost) return <div className="container-custom py-12 text-center">Post not found</div>;

  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1>
      <div className="flex gap-2 mb-6">
        {currentPost.tags?.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">#{tag}</span>
        ))}
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentPost.body}</p>
      </div>
    </div>
  );
}