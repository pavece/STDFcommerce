export default interface IProduct {
  images: string[];
  title: string;
  price: number;
  description: string;
  slug: string;
  available: boolean;
  category: "technology" | "tools" | "furniture";
}
