import IProduct from "./interfaces/product";
export const testProducts: IProduct[] = [
  {
    images: ["/productImages/crate01.png"],
    title: "Modern wooden crate",
    price: 56,
    description: "This wooden crate is a very special wooden crate",
    slug: "modern_wooden_crate",
    available: true,
    category: "furniture",
  },
  {
    images: ["/productImages/crate02.png"],
    title: "Normal wooden crate",
    price: 40,
    description: "This wooden crate is a pretty normal wooden crate",
    slug: "normal_wooden_crate",
    available: true,
    category: "technology",
  },
  {
    images: ["/productImages/toolbox01.png"],
    title: "Small toolbox",
    price: 130,
    description: "Toolbox full of spare use tools",
    slug: "small_toolbox",
    available: true,
    category: "tools",
  },
  {
    images: ["/productImages/toolbox02.png"],
    title: "Red toolbox",
    price: 98,
    description: "Toolbox full of daily use tools",
    slug: "red_toolbox",
    available: true,
    category: "tools",
  },
  {
    images: ["/productImages/tech01.png"],
    title: "Phone and watch kit",
    price: 450,
    description:
      "Wanna get started with some tech products, why not get a good phone and smartwatch ?",
    slug: "phone_and_clock",
    available: true,
    category: "technology",
  },
];
