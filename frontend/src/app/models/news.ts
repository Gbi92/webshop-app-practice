export interface News {
  id: number;
  title: string;
  content: string;
  publishDate: number;
}

export interface NewsList {
  news: News[];
}
