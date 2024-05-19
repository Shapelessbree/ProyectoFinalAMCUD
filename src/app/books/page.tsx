"use client"

import { Button } from '@/components/Button'
import { Table, TableTr } from '@/components/Table'
import { MainLayout } from '@/layouts'
import { getBooks, deleteBookById } from '@/services/books' // Ensure this service is correctly set up
import { FakeBook } from '@/types/fakeBook' // Adjust this type according to your book data structure
import React, { useEffect, useState } from 'react'

export default function Books() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<FakeBook[]>([]);

  const headers = ["ID", "Title", "Page Count", "Publishing Date", "Description"]

  function getBooksFunc() {
    getBooks().then((res) => {
      console.log(res.data)
      setBooks(res.data)
      setIsLoading(false)
    }).catch((err) => {
      console.error(err)
      setIsLoading(false)
    })
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
    getBooksFunc()
  }, [])

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl text-red-400 font-sans-serif font-semibold">📚 Available books 📚</h1>
        <Table headers={headers} isLoading={isLoading}>
          {books.slice(0, 30).map((book: FakeBook) => (
            <TableTr key={book.id.toString()}>
              <td className="border border-gray-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 text-center font-bold">{book.id}</td>
              <td className="border border-gray-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 text-center">{book.title}</td>
              <td className="border border-gray-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 md:4 text-center">{book.pageCount}</td>
              <td className="border border-gray-300 max-w-[100px] overflow-hidden text-ellipsis text-red-300 text-center">{book.publishDate}</td>
              <td className="border border-gray-300 max-w-[500px] overflow-hidden truncate whitespace-normal text-white md:6">{book.description}</td>
              <td className="border border-gray-300 mt-4 md:2 text-center">
                <Button
                  className="text-red-400 bg-black rounded-md px-2 py-1"
                  href={`/books/detail/${book.id}`}
                >
                  See details
                </Button>

                <Button
                  className="text-red-400 bg-black rounded-md px-2 py-1"
                  href={`/books/edit/${book.id}`}
                >
                  Edit
                </Button>
                <Button
                  className="text-white bg-red-400 rounded-md px-2 py-1 ml-2"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>
              </td>
            </TableTr>
          ))}
        </Table>
      </div>
    </MainLayout>
  );
}
