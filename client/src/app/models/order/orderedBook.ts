import { OrderBookDetails } from './orderBookDetails';

export interface OrderedBook {
  bookDetails: OrderBookDetails;
  quantity: number;
  price: number;
}
