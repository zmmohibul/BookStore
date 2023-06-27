import { Picture } from '../picture';
import { Author } from '../author/author';
import { Publisher } from '../publisher/publisher';
import { Category } from '../category';

export interface Book {
  id: number;
  name: string;
  description: string;
  highlight: string;
  pictures: Picture[];
  authors: Author[];
  publisher: Publisher;
  categories: Category[];
  paperbackPrice: number;
  paperbackQuantity: number;
  hardcoverPrice: number;
  hardcoverQuantity: number;
  printLength: number;
  restockDate: Date;
  language: string;
  publicationDate: Date;
  isbn13: string;
}
