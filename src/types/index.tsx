export type LinkInfo = {
  label: string;
  path: string;
};

export type CategoriesResponse= Array<CategoryResponse>;
export type CategoryResponse = {
  id: number;
  categoryLabel: "accessories" | "dresses" | "hats" | "jackets" | "shoes";
  categoryDetails: {
    title: string;
    price: number;
    description: string;
    imagePath: string;
  };
};

export type Categories= Array<Category>;
export type Category = {
  id: number;
  categoryLabel: "accessories" | "dresses" | "hats" | "jackets" | "shoes";
  title: string;
  price: number;
  description: string;
  imagePath: string;
};

export type CartCategory = Category & {
  quantity: number;
};
