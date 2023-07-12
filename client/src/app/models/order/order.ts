import { OrderedBook } from './orderedBook';
import { OrderStatus } from './orderStatus';

export interface Order {
  id: number;
  orderedBooks: OrderedBook[];
  subtotal: number;
  orderDate: string;
  orderStatus: OrderStatus;
}
