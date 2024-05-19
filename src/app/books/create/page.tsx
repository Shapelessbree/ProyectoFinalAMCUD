"use client";
import { MainLayout } from '@/layouts'
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from 'react'; // Importa useState
import axios from 'axios'; // Importa axios
import { Book } from '@/types/book';
import { Button } from '@/components/Button';
import { NumberInput, ShortTextInput, DateInput, LongTextInput, MidTextInput} from '@/components/Inputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBookSchema } from '@/helper/BookSchemaValidate';

export default function CreateBook() {
    const [photoUrl, setPhotoUrl] = useState('https://pngfre.com/wp-content/uploads/hello-kitty-44-300x288.png'); // Define photoUrl fuera del objeto useForm

    const methods = useForm<Book>({
        resolver: yupResolver(createBookSchema)
    });

    const onSubmit: SubmitHandler<Book> = (data) => {
        console.log(data);

        // Realiza la llamada a la API
        axios.post('https://fakerestapi.azurewebsites.net/api/Books', data)
            .then(response => {
                console.log('Book created successfully:', response.data);
                
            })
            .catch(error => {
                console.error('Error creating book:', error);
            });
    }

    return (
        <MainLayout>
            <div className="p-5 bg-red-100 rounded-lg shadow-md max-w-md mx-auto border border-blue-300">
                <h1 className="text-3xl text-red-400 font-sans-serif font-semibold mb-8">
                    Create Book
                </h1>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-3'>
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
