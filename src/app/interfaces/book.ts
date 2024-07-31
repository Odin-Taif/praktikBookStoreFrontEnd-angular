export interface Book {
  id: number; // Represents the unique identifier for the book.
  title: string; // The title of the book. (Required)
  author: string; // The author of the book. (Required)
  isbn: string; // The ISBN of the book. (Required)
  publishedDate: Date; // The date the book was published.
  publisher?: string; // The publisher of the book. (Optional)
}
