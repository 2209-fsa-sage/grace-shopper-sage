import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import orders from "./orders";
import user from "./singleUser";
import users from "./allUsers";

const reducer = combineReducers({ auth, orders, user, users });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./orders";
export * from "./singleUser";
export * from "./allUsers";
