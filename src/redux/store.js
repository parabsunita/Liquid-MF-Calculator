// src/redux/store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Correct import

import rootReducer from "./reducers/navReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
