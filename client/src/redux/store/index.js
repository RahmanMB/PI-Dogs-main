/* Importing the configureStore function from the reduxjs/toolkit library. */
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
/* Importing the rootReducer from the reducers folder. */
import rootReducer from "../reducers";

/* Creating a store object that is used to store the state of the application. */
const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});

export default store;
