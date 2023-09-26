export type LinkInfo = {
  label: string;
  path: string;
};

export type CategoriesResponse = Array<CategoryResponse>;
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

export type Products = Array<Product>;
export type Product = {
  id: number;
  categoryLabel: string;
  title: string;
  price: number;
  description: string;
  imagePath: string;
  rating?: Rating;
};

export type CartCategory = Product & {
  quantity: number;
};

export type CartCategories = Array<CartCategory>;

export type ProductsResponse = Array<ProductResponse>;
export type ProductResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

type Rating = {
  rate: number;
  count: number;
};

export type UserDetails = {
  displayName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
};
