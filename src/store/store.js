import { compose, legacy_createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
//import { loggerMiddlewares } from "./middleware/logger"; // this is a custom middleware
import { rootReducer } from './root-reducer'
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cart"]
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(Boolean);

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);