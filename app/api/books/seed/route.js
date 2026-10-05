import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Book from '@/models/Book';

const novels = [
  {
    title: 'Aab-e-Hayat',
    author: 'Umera Ahmed',
    price: 1600,
    coverImage: '/novels/aab-e-hayat.jpg',
    genre: 'Spiritual & Social',
  },
  {
    title: 'Aks',
    author: 'Umera Ahmed',
    price: 1500,
    coverImage: '/novels/aks.jpg',
    genre: 'Social & Psychological',
  },
  {
    title: 'Amarbail',
    author: 'Umera Ahmed',
    price: 1550,
    coverImage: '/novels/amarbail.jpg',
    genre: 'Romance & Social',
  },
  {
    title: 'Beli Rajputan Ki Malika',
    author: 'Nimra Ahmed',
    price: 1700,
    coverImage: '/novels/beli-rajputan-ki-malika.jpg',
    genre: 'Historical & Romance',
  },
  {
    title: 'Halim',
    author: 'Nimra Ahmed',
    price: 1900,
    coverImage: '/novels/halim.jpg',
    genre: 'Adventure & Mystery',
  },
  {
    title: 'Hasil',
    author: 'Umera Ahmed',
    price: 1450,
    coverImage: '/novels/hasil.jpg',
    genre: 'Social',
  },
  {
    title: 'Hum Kahan Ke Sachay Thay',
    author: 'Umera Ahmed',
    price: 1650,
    coverImage: '/novels/hum-kahan-ke-sachay-the.jpg',
    genre: 'Social & Psychological',
  },
  {
    title: 'Iblees',
    author: 'Nimra Ahmed',
    price: 1750,
    coverImage: '/novels/iblees.jpg',
    genre: 'Mystery',
  },
  {
    title: 'Ishq-e-Yaram',
    author: 'Areej Shah',
    price: 1800,
    coverImage: '/novels/ishq-e-yaram.jpg',
    genre: 'Romance',
  },
  {
    title: 'Jannat Ke Pattay',
    author: 'Nimra Ahmed',
    price: 1650,
    coverImage: '/novels/jannat-ke-pattay.jpg',
    genre: 'Thriller & Romance',
  },
  {
    title: 'Kankar',
    author: 'Umera Ahmed',
    price: 1450,
    coverImage: '/novels/kankar.jpg',
    genre: 'Social',
  },
  {
    title: 'Karakoram Ka Taj Mahal',
    author: 'Nimra Ahmed',
    price: 1800,
    coverImage: '/novels/karakoram-ka-taj-mahal.jpg',
    genre: 'Adventure & Romance',
  },
  {
    title: 'Main Anmol',
    author: 'Nimra Ahmed',
    price: 1400,
    coverImage: '/novels/main-anmol.jpg',
    genre: 'Social & Romance',
  },
  {
    title: 'Mala',
    author: 'Nimra Ahmed',
    price: 1500,
    coverImage: '/novels/mala.jpg',
    genre: 'Romance & Drama',
  },
  {
    title: 'Man-o-Salwa',
    author: 'Umera Ahmed',
    price: 1550,
    coverImage: '/novels/man-o-salwa.jpg',
    genre: 'Spiritual & Social',
  },
  {
    title: 'Mushaf',
    author: 'Nimra Ahmed',
    price: 1600,
    coverImage: '/novels/mushaf.jpg',
    genre: 'Spiritual & Romance',
  },
  {
    title: 'Namal',
    author: 'Nimra Ahmed',
    price: 1750,
    coverImage: '/novels/namal.jpg',
    genre: 'Crime & Suspense',
  },
  {
    title: 'Paras',
    author: 'Nimra Ahmed',
    price: 1450,
    coverImage: '/novels/paras.jpg',
    genre: 'Romance & Drama',
  },
  {
    title: 'Peer-e-Kamil',
    author: 'Umera Ahmed',
    price: 1500,
    coverImage: '/novels/peer-e-kamil.jpg',
    genre: 'Spiritual & Social',
  },
  {
    title: 'Rooh-e-Yaram',
    author: 'Areej Shah',
    price: 1850,
    coverImage: '/novels/rooh-e-yaram.jpg',
    genre: 'Romance & Action',
  },
  {
    title: 'Soda',
    author: 'Sumaira Hameed',
    price: 1350,
    coverImage: '/novels/soda.jpg',
    genre: 'Social & Drama',
  },
  {
    title: 'Tawaf-e-Ishq',
    author: 'Sumaira Hameed',
    price: 1700,
    coverImage: '/novels/tawaf-e-ishq.jpg',
    genre: 'Romance',
  },
  {
    title: 'Umm-e-Yaqeen',
    author: 'Sumaira Hameed',
    price: 1650,
    coverImage: '/novels/umm-e-yaqeen.jpg',
    genre: 'Romance & Social',
  },
  {
    title: 'Wali',
    author: 'Sumaira Hameed',
    price: 1750,
    coverImage: '/novels/wali.jpg',
    genre: 'Romance & Drama',
  },
  {
    title: 'Yaram',
    author: 'Sumaira Hameed',
    price: 1350,
    coverImage: '/novels/yaram.jpg',
    genre: 'Romantic',
  },
  {
    title: 'Zindagi Gulzar Hai',
    author: 'Umera Ahmed',
    price: 1550,
    coverImage: '/novels/zindagi-gulzar-hai.jpg',
    genre: 'Social & Romance',
  },
];

export async function POST() {
  try {
    await dbConnect();

    const existingBooks = await Book.countDocuments();

    if (existingBooks > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Books collection already contains ${existingBooks} books. Seed was not run again.`,
        },
        { status: 400 }
      );
    }

    const books = await Book.insertMany(novels);

    return NextResponse.json(
      {
        success: true,
        message: `${books.length} novels added successfully to MongoDB.`,
        count: books.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('SEED BOOKS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to seed books.',
      },
      { status: 500 }
    );
  }
}