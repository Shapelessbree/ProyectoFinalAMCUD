"use client";
import { MainLayout } from '@/layouts';
import { Button } from '@/components/Button';
import { Table, TableTr } from '@/components/Table';
import { getBooks, deleteBookById } from '@/services/books';
import React, { useEffect, useState } from 'react';
import { FakeBook } from '@/types/fakeBook';

export default function Books() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<FakeBook[]>([]);

  const headers = ["ID", "Title", "Page Count", "Publishing Date", "Description", "Actions"];

  function getBooksFunc() {
    getBooks().then((res) => {
      console.log(res.data);
      setBooks(res.data);
      setIsLoading(false);
    }).catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteBookById(id);
      getBooksFunc();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    getBooksFunc();
  }, []);

  return (
    <MainLayout>
       {/* Banner */}
       <div className="w-full h-[200px] bg-cover bg-center mb-8" style={{ backgroundImage: "url('/images/Banner-kitty.jpg')" }}>
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-5xl font-bold">🌸Welcome to our library🌸</h1>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-red-300 font-sans-serif font-semibold">📚 Available books 📚</h1>
        <Table headers={headers} isLoading={isLoading}>
          {books.slice(0, 30).map((book: FakeBook) => (
            <TableTr key={book.id.toString()}>
              <td className="border border-red-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 text-center font-bold">{book.id}</td>
              <td className="border border-red-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 text-center">{book.title}</td>
              <td className="border border-red-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 md:4 text-center">{book.pageCount}</td>
              <td className="border border-red-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 text-center">{book.publishDate}</td>
              <td className="border border-red-300 max-w-[500px] overflow-hidden truncate whitespace-normal text-white md:6 mt-1">{book.description}</td>
              <td className="border border-red-300 mt-4 md:2 text-center">
                <div className="mt-2"> {/* Agregar margen superior aquí */}
                  <Button
                    className="text-white bg-red-300 hover:bg-red-800 rounded-md px-3 py-1 text-sm" // Ajustando el tamaño del padding y el texto
                    href={`/books/detail/${book.id}`}
                  >
                    See details
                  </Button>
                </div>
                <div className="mt-2">
                  <Button
                    className="text-red-300 bg-black hover:bg-white rounded-full px-1 py-1 text-sm" // Ajustando el tamaño del padding y el texto
                    href={`/books/edit/${book.id}`}
                  >
                    Edit Book
                  </Button>
                  <Button
                    className="text-red-800 bg-black hover:bg-white rounded-full px-1 py-1 ml-2 text-sm" // Ajustando el tamaño del padding y el texto
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete Book ❌
                  </Button>
                </div>
              </td>
            </TableTr>
          ))}
        </Table>
      </div>
      {/* Muestra la imagen fuera de la tabla */}
   <img className="w-32 h-32 object-cover mx-auto opacity-30" src="/images/Pixelkitty.png" alt="Photo" />
    </MainLayout>
  );
}


