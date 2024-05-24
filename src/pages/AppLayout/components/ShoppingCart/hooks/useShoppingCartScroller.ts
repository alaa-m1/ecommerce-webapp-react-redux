import {
  RefObject,
  createRef,
  useMemo
} from "react";
import { CartCategories } from "types";
// import { useDispatch } from "react-redux";
// import { setActiveCartElement } from "store/shoppingState/shoppingStateActions";

type Props = {
  cartItems: CartCategories;
};
export const useShoppingCartScroller = ({ cartItems }: Props) => {
  // const previouscartItems = useRef<CartCategories>([]);
  // const dispatch = useDispatch();
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

  // useEffect(() => {
  //   if (!_.isEmpty(previouscartItems.current)) {
  //     const diff = _.differenceWith(
  //       cartItems,
  //       previouscartItems.current,
  //       _.isEqual
  //     );
  //     if (!_.isEmpty(diff)) {
  //       const activeCart = shoppingCartRefs[diff[0].id].current;
  //       if (activeCart)
  //         dispatch(setActiveCartElement(activeCart))
        
  //       // shoppingCartRefs[diff[0].id].current?.scrollIntoView({
  //       //   behavior: "smooth",
  //       //   block: "nearest",
  //       //   inline: "start"
  //       // });
  //     }
  //   }
  //   previouscartItems.current = cartItems;
  // }, [cartItems, shoppingCartRefs]);

  return { shoppingCartRefs };
};
