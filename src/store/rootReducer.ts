import {combineReducers} from "redux";
import { userReducer } from "./user/userReducer";
import { localProductsReducer } from "./localProducts/localProductsReducer";
import { shoppingCartReducer } from "./shoppingCart/shoppingCartReducer";
import { productsReducer } from "./products/productsReducer";
import { shoppingStateReducer } from "./shoppingState/shoppingStateReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: localProductsReducer,
    shoppingCart: shoppingCartReducer,
    products: productsReducer,
    shoppingState: shoppingStateReducer
})