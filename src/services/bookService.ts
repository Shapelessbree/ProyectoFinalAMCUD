import axios from 'axios';

export const getbooksById = async (id: string): Promise<any> => {
  const response = await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`);
  return response.data;

};

export const getBookCoverById = async (idBook: number): Promise<string> => {
  const response = await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/books/covers/${idBook}`);
  return response.data[0].url; // Extrayendo la URL de la primera imagen en el array
};