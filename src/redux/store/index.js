
import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../reducer/index";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware())
  );

  export default store; 