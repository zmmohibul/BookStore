import { BookType } from '../bookType';

export interface OrderBookItem {
  bookId: number;
  quantity: number;
  bookType: BookType;
}
