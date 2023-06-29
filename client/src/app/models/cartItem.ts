import { BookType } from './bookType';

export interface CartItem {
  id: number;
  name: string;
  type: BookType;
  quantity: number;
  quantityInStock: number;
  unitPrice: number;
  pictureUrl: string;
}
