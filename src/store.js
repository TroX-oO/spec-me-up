import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};
let storeInstance = null;

export default function configureStore(initialState = {}) {
  if (!storeInstance) {
    const persistedState = loadState();
    const store = createStore(
      rootReducer,
      persistedState,
      applyMiddleware(thunk)
    );

    store.subscribe(() => {
      saveState(store.getState());
    });

    storeInstance = store;
  }
  return storeInstance;
}
