export type LinkInfo = {
  label: string;
  path: string;
};

export type Category = {
  categoryLabel: "accessories"|"dresses"|"hats"|"jackets"|"shoes";
  categoryDetails: {
    title: string;
    price: string;
    description: string;
    imagePath: string;
  };
};
