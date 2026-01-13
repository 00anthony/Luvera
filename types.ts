
export interface Creator {
  id: string;
  name: string;
  handle: string;
  image: string;
  videoThumb: string;
  quote: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}
