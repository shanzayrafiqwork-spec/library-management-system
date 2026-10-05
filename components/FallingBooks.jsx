"use client";

import { useEffect, useState } from "react";

const bookImages = [
  "/novels/peer-e-kamil.jpg",
  "/novels/jannat-ke-pattay.jpg",
  "/novels/namal.jpg",
  "/novels/mushaf.jpg",
  "/novels/rooh-e-yaram.jpg",
  "/novels/amarbail.jpg",
  "/novels/halim.jpg",
  "/novels/yaram.jpg",
  "/novels/aab-e-hayat.jpg",
];

export default function FallingBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const list = Array.from({ length: 18 }).map((_, index) => ({
      id: index,
      image: bookImages[index % bookImages.length],
      left: Math.random() * 100,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 40 + Math.random() * 20,
      rotate: Math.random() * 360,
    }));

    setBooks(list);
  }, []);

  return (
    <div className="falling-books-container">
      {books.map((book) => (
        <img
          key={book.id}
          src={book.image}
          alt=""
          className="falling-book"
          style={{
            left: `${book.left}%`,
            width: `${book.size}px`,
            height: `${book.size * 1.4}px`,
            animationDuration: `${book.duration}s`,
            animationDelay: `-${book.delay}s`,
            "--start-rotate": `${book.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}