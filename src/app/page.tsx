"use client";

import { MainLayout } from "@/layouts";
import { Routes } from "@/utils/Routes";
import { useRouter } from 'next/navigation';

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Michael Brown", email: "michael@example.com", age: 35 },
];

export default function Home() {
  const navigate = useRouter();

  return (
    <MainLayout>
    <div className="flex">
      {/* Imagen grande en la parte inferior izquierda */}
      <div className="w-2/3 pr-8">
        <img src="/images/Kitty.png" alt="Imagen Grande" className="w-[400px] h-[400px]" />
      </div>
  
      {/* Descripción a la derecha de la imagen */}
      <div className="w-1/3">
        <h1 className="text-3xl text-red-400 font-bold mb-4">Description</h1>
        <p className="text-gray-600 pb-8">
        This is the description of the page. Here you can add any text you wish to describe the image or page content. You can use this space to provide additional information, context or relevant details about the content displayed on the left. This project uses React to create a page that allows you to create books.
        </p>
        {/* Botón para crear un libro */}
        <div className="mt-8">
          <div className="w-[200px] h-[40px] rounded-lg bg-red-400 flex justify-center items-center" onClick={() => { navigate.push(Routes.bookRoutes.createbooks); }}>
            <h1>Create book</h1>
          </div>
        </div>
      </div>
    </div>

    
<div className="flex flex-col items-center w-full gap-6 p-6">
        <h1 className="text-3xl text-red-400 font-bold">User list</h1>
        <table className="min-w-full bg-black shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-red-400 bg-gray-900 text-left">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-red-400 bg-gray-900 text-left">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-red-400 bg-gray-900 text-left">E-mail</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-red-400 bg-gray-900 text-left">Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </MainLayout>

  );
}
