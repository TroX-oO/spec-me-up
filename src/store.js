import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'lodash';
import rootReducer from './reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
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
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
let storeInstance = null;

export default function configureStore() {
  if (!storeInstance) {
    const persistedState = loadState();
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      rootReducer,
      persistedState,
      composeEnhancers(applyMiddleware(thunk))
    );

    store.subscribe(() => {
      saveState(store.getState());
    });

    storeInstance = store;
  }
  return storeInstance;
}
