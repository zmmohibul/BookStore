import { OrderedBook } from './orderedBook';

export interface Order {
  id: number;
  orderedBooks: OrderedBook[];
  subtotal: number;
  orderDate: string;
  orderStatus: string;
}
