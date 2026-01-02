export class BookResponseDto {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
}
