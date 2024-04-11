export interface News {
  id: number;
  title: string;
  content: string;
  imagePath: string;
  imgOrientation: 'vertical' | 'horizontal';
  publishDate: number;
}
