export interface News {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  imgOrientation: 'vertical' | 'horizontal';
  publishDate: number;
}
