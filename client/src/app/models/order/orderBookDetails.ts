import { BookType } from '../bookType';

export interface OrderBookDetails {
  bookId: number;
  bookName: string;
  bookType: BookType;
  pictureUrl: string;
}
