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
  decreaseCartItem: (item: Category) => null;
  removeFromCart: (item: Category) => null;
  cartCounter: number;
  cartTotal: number;
};
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  showCart: false,
  setShowCart: (show: boolean) => null,
  cartItems: [],
  addToCart: (item: Category) => null,
  decreaseCartItem: (item: Category) => null,
  removeFromCart: (item: Category) => null,
  cartCounter: 0,
  cartTotal: 0,
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
const decreaseItemInCart = (
  cartItems: Array<CartCategory>,
  itemToDecrease: Category
): Array<CartCategory> => {
  const existedCategory = cartItems.find(
    (cartItem) => cartItem.id === itemToDecrease.id
  );
  if (existedCategory && existedCategory?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToDecrease.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === itemToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeItemFromCart = (
  cartItems: Array<CartCategory>,
  itemIdToRemoveId: number
): Array<CartCategory> =>
  cartItems.filter((cartItem) => cartItem.id !== itemIdToRemoveId);

export const ShoppingCartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Array<CartCategory>>([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const cartItemsCount = cartItems.reduce(
      (total, item) => (total = total + item.quantity),
      0
    );
    setCartCounter(cartItemsCount);
  }, [cartItems]);

  useEffect(() => {
    const cartItemsTotal = cartItems.reduce(
      (total, item) => (total = total + item.quantity * item.price),
      0
    );
    setCartTotal(cartItemsTotal);
  }, [cartItems]);

  const addToCart = (item: Category) => {
    setCartItems(addItemToCart(cartItems, item));
  };
  const decreaseCartItem = (item: Category) => {
    setCartItems(decreaseItemInCart(cartItems, item));
  };
  const removeFromCart = (item: Category) => {
    setCartItems(removeItemFromCart(cartItems, item.id));
  };

  const value: any = {
    showCart,
    setShowCart,
    cartItems,
    addToCart,
    cartCounter,
    cartTotal,
    decreaseCartItem,
    removeFromCart,
  };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
