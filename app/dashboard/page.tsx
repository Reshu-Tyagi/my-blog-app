'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="container-custom py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Hello Admin!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your dashboard, {user?.firstName || 'User'}!
        </p>
      </div>
    </div>
  );
}