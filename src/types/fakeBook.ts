export interface FakeBook {
    id: number;
    title: string;
    description: string;
    pageCount: number;
    excerpt: string;
    publishDate: string;
}

export interface Rating {
    rate:  number;
    count: number;
}