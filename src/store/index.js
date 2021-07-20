import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga"
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import rootSaga from "@/sagas";
import createRootReducer from "@/reducers";

export const history = createBrowserHistory()


export default function configureStore(){
  const sagaMiddleware = createSagaMiddleware(rootSaga);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [routerMiddleware(history), sagaMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    // Logging Middleware
    const logger = createLogger({
      level: 'info',
      collapsed: true
    })
    middlewares.push(logger);
  }
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
  );
  //-- redux hmr
  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }
  sagaMiddleware.run(rootSaga);

  return store
}
