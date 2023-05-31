import { createContext, useState } from "react";
import { CartCategory, Category } from "types";

type CartProviderProps = {
  children: React.ReactNode;
};

export const ShoppingCartContext = createContext({
  showCart: false,
  setShowCart: (show: boolean) => null,
  cartItems: [],
  addToCart: (item: Category) => null,
});

const addItemToCart = (
  cartItems: Array<CartCategory>,
  itemToAdd: Category
): Array<CartCategory> => {
  const existedCategory = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id
  );
  if (existedCategory) {
    console.log("existedCategory=", existedCategory);
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity+1 }
        : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};
export const ShoppingCartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Array<CartCategory>>([]);

  const addToCart = (item: Category) => {
    setCartItems(addItemToCart(cartItems, item));
  };

  const value: any = { showCart, setShowCart, cartItems, addToCart };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
