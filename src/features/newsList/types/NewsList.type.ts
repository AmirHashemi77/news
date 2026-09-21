export interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  commentCount: number;
  image: string;
  url: string;
  tags: string[];
  publishDate: string;
  className?: string;
}
