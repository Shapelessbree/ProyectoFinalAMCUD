import axios from "axios";

  export async function getBooks(): Promise<any> {
    const response = await axios.get("https://fakerestapi.azurewebsites.net/api/v1/Books");
    return response;
  }

  export const deleteBookById = async (id: number): Promise<any> => {
    const response = await axios.delete(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`);
    return response.data;
  };
  
  export const getBookById = async (id: string): Promise<any> => {
    const response = await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`);
    return response.data;
  };
  
  export const updateBookById = async (id: string, book: any): Promise<any> => {
    const response = await axios.put(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`, book);
    return response.data;
  };
  