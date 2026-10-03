'use client';
import { useEffect, useState } from 'react';

export default function FallingBooks() {
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setMounted(true);
    const icons = ['📚', '📖', '📜', '✍️'];
    const list = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      left: Math.random() * 90,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
    setBooks(list);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {books.map((b) => (
        <div
          key={b.id}
          className="absolute text-amber-400 text-2xl animate-pulse"
          style={{
            left: `${b.left}%`,
            animation: `fall ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
            top: '-40px',
          }}
        >
          {b.icon}
        </div>
      ))}
    </div>
  );
}