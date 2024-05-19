"use client";

import { useEffect, useState } from 'react';
import { MainLayout } from "@/layouts";
import { Routes } from "@/utils/Routes";
import { useRouter } from 'next/navigation';

export default function Home() {
  const navigate = useRouter();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://fakerestapi.azurewebsites.net/api/v1/Books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://fakerestapi.azurewebsites.net/api/v1/Users');
        const data = await response.json();
        // Limit to 10 users and add email, firstName, lastName
        const limitedUsers = data.slice(0, 6).map((user, index) => ({
          ...user,
          firstName: `Name${index + 1}`,
          lastName: `Last Name${index + 1}`,
          email: `user${index + 1}@example.com`
        }));
        setUsers(limitedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <MainLayout>
     
      {/* Banner */}
      <div className="w-full h-[300px] bg-cover bg-center mb-8" style={{ backgroundImage: "url('/images/library-banner.jpg')" }}>
       <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-5xl font-bold">🌸Welcome to our library🌸</h1>
      </div>
      </div>


      {/* Contenido principal */}
      <div className="container mx-auto p-6">
        <div className="flex">
          {/* Imagen grande en la parte inferior izquierda */}
          <div className="w-2/3 pr-8">
            <img src="/images/Kitty.png" alt="Imagen Grande" className="w-full h-[400px] object-cover" />
          </div>

          {/* Descripción a la derecha de la imagen */}
          <div className="w-1/3">
            <h1 className="text-3xl text-red-400 font-bold mb-4">About us</h1>
            <p className="text-gray-600 pb-8">
            Discover an extensive array of books spanning across diverse genres, catering to every literary taste imaginable. Whether your passion lies in the timeless allure of literary classics, the gripping narratives of contemporary novels, or the thrilling escapades of bestselling titles, our bookstore is your gateway to your next literary adventure. Immerse yourself in a world of words where possibilities are endless and stories abound. With competitive prices and unparalleled customer service, we're dedicated to ensuring your journey through the pages is as delightful as the tales themselves. Welcome to a haven where book lovers unite and where every page turned is a step closer to enlightenment.
            </p>
            {/* Botón para crear un libro */}
            <div className="mt-1">
              <div className="w-[150px] h-[40px] rounded-lg bg-red-400 hover:bg-red-800 flex justify-center items-center cursor-pointer" onClick={() => { navigate.push(Routes.bookRoutes.createbooks); }}>
                <h1 className="text-white">Add book 📚</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
  <h1 className="text-3xl text-red-400 font-bold mb-6">Newest releases</h1>
  <div className="grid grid-cols-3 gap-6">
    {books.slice(0, 3).map((book) => (
      <div key={book.id} className="bg-red-50 shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-[300px] bg-gray-200">
          <img src="/images/default-book-cover.jpg" alt={book.title} className="absolute w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-red-300">{book.title}</h2>
          <p className="text-gray-400">{truncateText(book.excerpt, 200)}</p>
          <p className="text-gray-400 text-semibold">Page count: {book.pageCount}</p>
          <a href={`/books/detail/${book.id}`} className="text-white mt-8 inline-block bg-red-300 px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out">See More</a>
        </div>
      </div>
    ))}
  </div>
</div>


       {/* Lista de usuarios */}
<div className="mt-12">
  <h1 className="text-3xl text-red-400 font-bold">Lastest users</h1>
  <table className="min-w-full bg-gray-1000 shadow-md rounded-lg mt-6">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b-2 border-red-400 text-red-400 bg-gray-900 text-left bg-red-200">ID</th>
        <th className="py-2 px-4 border-b-2 border-red-400 text-red-400 bg-gray-900 text-left bg-red-200">Usuario</th>
        <th className="py-2 px-4 border-b-2 border-red-400 text-red-400 bg-gray-900 text-left bg-red-200">Nombre</th>
        <th className="py-2 px-4 border-b-2 border-red-400 text-red-400 bg-gray-900 text-left bg-red-200">Apellido</th>
        <th className="py-2 px-4 border-b-2 border-red-400 text-red-400 bg-gray-900 text-left bg-red-200">Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="py-2 px-4 border-b border-red-200 bg-red-50 text-red-400 font-bold">{user.id}</td>
          <td className="py-2 px-4 border-b border-red-200 bg-red-50 text-gray-400">{user.userName}</td>
          <td className="py-2 px-4 border-b border-red-200 bg-red-50 text-gray-400">{user.firstName}</td>
          <td className="py-2 px-4 border-b border-red-200 bg-red-50 text-gray-400">{user.lastName}</td>
          <td className="py-2 px-4 border-b border-red-200 bg-red-50 text-gray-400">{user.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
      {/* Muestra la imagen fuera del formulario */}
   <img className="w-32 h-32 object-cover mx-auto opacity-30" src="/images/Pixelkitty.png" alt="Photo" />
    </MainLayout>
  );
}
