import axios from 'axios';

export const getProductById = async (id: string): Promise<any> => {

  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;

};
