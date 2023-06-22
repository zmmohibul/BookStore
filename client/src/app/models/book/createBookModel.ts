export class CreateBookModel {
  name: string = '';
  description: string = '';
  authorsId: number[] = [];
  publisherId: number = 0;
  categoriesId: number[] = [];

  paperbackPrice: number = 0;
  paperbackQuantity: number = 0;

  hardcoverPrice: number = 0;
  hardcoverQuantity: number = 0;

  printLength: number = 0;
  language: string = '';
  isbn13: string = '';
  publicationDate: Date = new Date();
}
