import { OrderedBook } from './orderedBook';
import { OrderStatus } from './orderStatus';
import { Address, UserDetail } from '../userDetail';

export interface Order {
  id: number;
  orderedBooks: OrderedBook[];
  subtotal: number;
  orderDate: string;
  orderStatus: OrderStatus;
  orderedByUser: UserDetail;
  userAddress: Address;
}
