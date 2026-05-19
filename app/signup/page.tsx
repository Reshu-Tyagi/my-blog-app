'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Demo: Please login with credentials:\nUsername: emilys\nPassword: emilyspass');
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Join our community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 rounded-lg border" required />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          <p className="text-center text-sm">
            Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}