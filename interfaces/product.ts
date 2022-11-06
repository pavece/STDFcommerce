export default interface IProduct {
  _id?: string;
  images: string[];
  title: string;
  price: number;
  description: string;
  slug: string;
  available: boolean;
  category: "technology" | "tools" | "furniture";
}
