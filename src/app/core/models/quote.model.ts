export interface RootInterface {
  qotd_date: string;
  quote: Quote;
}

export interface Quote {
  id: number;
  favorites_count: number;
  dialogue: boolean;
  favorite: boolean;
  tags: string[];
  url: string;
  upvotes_count: number;
  downvotes_count: number;
  author: string;
  author_permalink: string;
  body: string;
}