"use client";

import { MainLayout } from '@/layouts';
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Book } from '@/types/book';
import { Button } from '@/components/Button';
import { NumberInput, ShortTextInput, DateInput, LongTextInput } from '@/components/Inputs';
import { useRouter, useParams } from 'next/navigation';
import { getBookById, updateBookById } from '@/services/books';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBookSchema } from '@/helper/BookSchemaValidate';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function EditBook() {
  const methods = useForm<Book>({
  
  resolver: yupResolver(createBookSchema),
  });
  const { handleSubmit, reset } = methods;
  const router = useRouter();
  const params = useParams();
  const { id_book } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const book = await getBookById(id_book as string);
        book.publishDate = formatDate(book.publishDate); // Format the date before resetting the form
        reset(book); // Populate form with book data
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id_book, reset]);

  const onSubmit: SubmitHandler<Book> = async (data) => {
    try {
      // Reformat publishDate to the correct format
      const formattedData = {
        ...data,
        publishDate: formatDate(data.publishDate)
      };
  
      console.log('Submitting data:', formattedData); // Log the data
      await updateBookById(id_book as string, formattedData);
      console.log('Book updated successfully');
      router.push('/books'); // Redirect to books list after successful save
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <MainLayout>
            <div className="p-5 bg-red-100 rounded-lg shadow-md max-w-md mx-auto border border-blue-300">
                <h1 className="text-3xl text-red-400 font-sans-serif font-semibold mb-8">
                    Edit Book
                </h1>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-4'>
                                <ShortTextInput name="title" title={<span className="text-red-400">Title</span>} />
                                <LongTextInput name="description" title={<span className="text-red-400">Description</span>} />
                                <NumberInput name="pageCount" title={<span className="text-red-400">Page Count</span>} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <LongTextInput name="excerpt" title={<span className="text-red-400">Excerpt</span>} />
                                <DateInput name="publishDate" title={<span className="text-red-400">Publish Date</span>} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6"> {/* Alinea el botón a la derecha */}
                            <Button type="submit" variant="pink" size="lg" isLoading={false}>
                                Save book
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
            {/* Muestra la imagen fuera del formulario */}
            <img className="w-64 h-64 object-cover mx-auto opacity-30" src="/images/Pixelkitty.png" alt="Photo" />
        </MainLayout>
  );
}
