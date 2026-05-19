'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container-custom py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 gradient-text text-center">Contact Us</h1>
      
      {submitted && (
        <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-lg text-center">
          <p className="text-green-700">Message sent! (Demo)</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input type="text" className="w-full px-4 py-2 rounded-lg border" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" className="w-full px-4 py-2 rounded-lg border" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea rows={5} className="w-full px-4 py-2 rounded-lg border" required />
        </div>
        <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium">
          Send Message
        </button>
      </form>
    </div>
  );
}