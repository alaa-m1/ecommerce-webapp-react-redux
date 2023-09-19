import {
  RefObject,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartCategories, CartCategory } from "types";
import _ from "lodash";

type Props = {
  cartItems: CartCategories;
};
export const useShoppingCartScroller = ({ cartItems }: Props) => {
  const [updatedCart, setUpdatedCart] = useState<CartCategory>();
  const previouscartItems = useRef<CartCategories>([]);

  const shoppingCartRefs = useMemo(
    () =>
      cartItems.reduce<{ [x: number]: RefObject<HTMLDivElement> }>(
        (res, item) => {
          res[item.id] = createRef();
          return res;
        },
        {}
      ),
    [cartItems]
  );

  useEffect(() => {
    if (!_.isEmpty(previouscartItems.current)) {
      const diff = _.differenceWith(
        cartItems,
        previouscartItems.current,
        _.isEqual
      );
      if (!_.isEmpty(diff)) {
        setUpdatedCart(diff[0]);
        shoppingCartRefs[diff[0].id].current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    previouscartItems.current = cartItems;
  }, [cartItems, shoppingCartRefs]);

  return { updatedCart, shoppingCartRefs };
};
