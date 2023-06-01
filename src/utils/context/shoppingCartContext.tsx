import { createContext, useEffect, useState } from "react";
import { CartCategory, Category } from "types";

type CartProviderProps = {
  children: React.ReactNode;
};

type ShoppingCartContextType = {
  showCart: boolean;
  setShowCart: (show: boolean) => null;
  cartItems: Array<CartCategory>;
  addToCart: (item: Category) => null;
  cartCounter: number;
};
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  showCart: false,
  setShowCart: (show: boolean) => null,
  cartItems: [],
  addToCart: (item: Category) => null,
  cartCounter: 0,
});

const addItemToCart = (
  cartItems: Array<CartCategory>,
  itemToAdd: Category
): Array<CartCategory> => {
  const existedCategory = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id
  );
  if (existedCategory) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};
export const ShoppingCartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Array<CartCategory>>([]);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const cartItemsCount = cartItems.reduce(
      (total, item) => (total = total + item.quantity),
      0
    );
    setCartCounter(cartItemsCount);
  }, [cartItems]);
  const addToCart = (item: Category) => {
    setCartItems(addItemToCart(cartItems, item));
  };

  const value: any = {
    showCart,
    setShowCart,
    cartItems,
    addToCart,
    cartCounter,
  };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
