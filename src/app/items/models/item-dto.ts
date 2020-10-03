export interface ItemDto {
  id: number;
  type: string;
  title: string;
  content?: string;
  videoSrc?: string;
  imgSrc: string;
  publishDate: string;
  views: number;
}
