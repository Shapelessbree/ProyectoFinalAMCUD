import { Book } from "@/types/book";
import * as yup from "yup";

const requiredString = yup
  .string()
  .typeError("*Must be a text")
  .required("*Required");

const requiredNumber = yup
  .number()
  .required("*Required")
  .typeError("*Must be a number");

const shortText = yup
  .string()
  .typeError("*Must be a text")
  .min(10, "*Minimum of 10 characters")
  .max(60, "*Maximum of 60 characters");

const longText = yup
  .string()
  .typeError("*Must be a text")
  .min(100, "*Minimum of 100 characters")
  .max(2000, "*Maximum of 2000 characters");

  const midText = yup
  .string()
  .typeError("*Must be a text")
  .min(50, "*Minimum of 50 characters")
  .max(300, "*Maximum of 300 characters");

export const createBookSchema = yup.object<Book>().shape({
  id: requiredNumber,
  title: shortText,
  description: midText,
  pageCount: requiredNumber,
  excerpt: longText,
  publishDate: requiredString,
  image: yup.string().url('La URL de la imagen no es válida').required('La URL de la imagen es requerida')
});
