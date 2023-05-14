import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const masterReducer = (state, action) => {
  if(action.type === HYDRATE){
    const nextState = {
      ...state,
      ...action.payload
    }
    if(state.auth.status==='resolved') nextState.auth = state.auth;
    if(state.filter) nextState.filter = state.filter;
    return nextState;
  }else{
    return rootReducer(state, action);
  }
};

const isServer = typeof window === 'undefined';

const makeStore = () => {
  // if(isServer) {
  //   const store = configureStore({
  //     reducer: masterReducer,
  //     devTools: process.env.NODE_ENV !== "production",
  //   });
  //   return store;
  // }else{
    
    const { persistStore, persistReducer,
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER, } = require('redux-persist');

      const encryptor = encryptTransform({
        secretKey: 'Super-Secret-key-sfsfe4fss@@#02282',
        onError: function (error) {
          // Handle the error.
        },
      });
      const persistConfig = {
        key: "root",
        version: 1,
        storage,
        whitelist: ["filter"],
        transforms: [encryptor] 
      };

      const persistedReducer = persistReducer(persistConfig, masterReducer);

    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  // }
}

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
