"use client";

import { MainLayout } from '@/layouts';
import { getbooksById, getBookCoverById } from '@/services/bookService';
import { Book } from '@/types/book';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BookDetailsPage() {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { id_book } = params;

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (id_book) {
        try {
          const fetchedBook = await getbooksById(id_book as string);
          const coverImageUrl = await getBookCoverById(parseInt(""+id_book));
          setBook({...fetchedBook, image: coverImageUrl});
        } catch (error) {
          console.error('Error al obtener los detalles del libro:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("El ID del libro está indefinido");
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id_book]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Libro no encontrado.</div>;
  }

  return (
<MainLayout>
    {/* Banner */}
    <div className="w-full h-[200px] bg-cover bg-center mb-8" style={{ backgroundImage: "url('/images/Banner1-kitty.jpg')" }}>
        <div className="h-full flex items-center justify-center bg-black bg-opacity-30">
        <h1 className="text-white text-5xl font-bold">🌸Welcome to our library🌸</h1>
        </div>
      </div>
  <div className="flex justify-center">
    <div className="max-w-6x2 px-5 py-12 bg-red-200 rounded-lg">
      <div className="max-w-5xl px-5 py-10 ml-4 bg-white text-white rounded-lg border border-red-300 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-red-300 md:text-center">{book.title}</h1>
        <div className="flex flex-wrap justify-between">
          <img src="/images/Kittybook.png" alt="Book Image" className="w-60 h-85 md:w-80 md:h-80 rounded-lg border-red overflow-hidden mt-2 ml-9 shadow-md" />
          <div className="w-full md:w-1/2 mt-2 md:mt-0 md:text-left flex flex-col justify-between">
            <div>
              <p className="font-semibold text-red-300 mb-0">Number of pages:</p>
              <p className="text-lg text-gray-400 semi-bold">{book.pageCount}</p>
              <p className="font-semibold text-red-300 mb-0">Date of publishing:</p>
              <p className="text-gray-400 mb-0">{book.publishDate}</p>
              <p className="font-semibold text-red-300 mb-0">Extract:</p>
              <p className="text-gray-400 inline italic">{book.excerpt.length > 300 ? `${book.excerpt.slice(0, 300)}...` : book.excerpt}</p>
              <p className="font-semibold text-red-300 mb-0 mt-2">Description:</p>
              <p className="text-gray-400 inline italic">{book.description.length > 200 ? `${book.description.slice(0, 200)}...` : book.description}</p>
            </div>
            <button className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-8 mr-5 rounded mt-2 self-start shadow-md">
              
              Add book to cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
   {/* Muestra la imagen fuera del formulario */}
   <img className="w-32 h-32 object-cover mx-auto opacity-30" src="/images/Pixelkitty.png" alt="Photo" />
</MainLayout>

  );
}
