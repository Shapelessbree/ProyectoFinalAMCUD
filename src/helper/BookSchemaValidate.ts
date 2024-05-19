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
  .max(50, "*Maximum of 100 characters");

const longText = yup
  .string()
  .typeError("*Must be a text")
  .min(50, "*Minimum of 50 characters")
  .max(500, "*Maximum of 100 characters");

export const createBookSchema = yup.object<Book>().shape({
  id: requiredNumber,
  title: requiredString,
  description: longText,
  pageCount: requiredNumber,
  excerpt: longText,
  publishDate: requiredString,
  image: yup.string().url('La URL de la imagen no es válida').required('La URL de la imagen es requerida')
});
