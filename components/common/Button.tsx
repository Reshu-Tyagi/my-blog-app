'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({ children, onClick, type = 'button', variant = 'primary', loading = false, fullWidth = false }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
        variant === 'primary' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white' : 'bg-gray-200 text-gray-700'
      } ${fullWidth ? 'w-full' : 'px-4'}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}