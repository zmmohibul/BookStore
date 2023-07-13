import { BookType } from '../bookType';

export interface OrderBookDetails {
  bookId: number;
  bookName: string;
  author: string;
  bookType: BookType;
  pictureUrl: string;
}
