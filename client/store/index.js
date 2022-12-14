import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import orders from "./orders";
import singleUser from "./singleUser";
import users from "./allUsers";
import allProducts from "./allProducts";
import singleProduct from "./singleProduct"
import cart from "./cart"


import adminProduct from "./adminProduct";
import adminSingleProduct from "./adminSingleProduct";

const reducer = combineReducers({
  allProducts,
  singleProduct,
  cart,
  auth,
  orders,
  adminProduct,
  singleUser,
  users,
  adminSingleProduct,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./allProducts";
export * from "./allUsers";
export * from "./auth";
export * from "./orders";
export * from "./adminProduct";
export * from "./singleUser";
export * from "./cart";
export * from "./singleProduct";
