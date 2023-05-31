export type LinkInfo = {
  label: string;
  path: string;
};

export type Category = {
  id: number;
  categoryLabel: "accessories" | "dresses" | "hats" | "jackets" | "shoes";
  categoryDetails: {
    title: string;
    price: string;
    description: string;
    imagePath: string;
  };
};

export type CartCategory = {
  id: number;
  categoryLabel: "accessories" | "dresses" | "hats" | "jackets" | "shoes";
  quantity: number;
  categoryDetails: {
    title: string;
    price: string;
    description: string;
    imagePath: string;
  };
};
