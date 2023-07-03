import { BookType } from '../bookType';

export interface OrderSummaryItem {
  id: number;
  name: string;
  type: BookType;
  quantity: number;
  unitPrice: number;
  pictureUrl: string;
}
