'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { Menu, X, Home, BookOpen, Info, Mail, LayoutDashboard, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md' : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-xl font-bold gradient-text">Blogify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated && (
              <Link href="/dashboard" className={`transition-colors ${pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{user?.firstName}</span>
                <button onClick={handleLogout} className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50">Login</Link>
                <Link href="/signup" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 w-full">Logout</button>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600">Login</Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white">Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}