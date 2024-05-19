export interface Book {
    photoUrl: string | undefined;
    id: number;
    title: string;
    description: string;
    pageCount: number;
    excerpt: string;
    publishDate: string;
    image?: string;  // Assuming there might be an 'image' field; if not, remove or adjust as necessary
  }
  