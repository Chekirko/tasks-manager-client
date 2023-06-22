// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';

// import { configureStore } from '@reduxjs/toolkit';

// const persistConfig = {
//   key: 'auth',
//   version: 1,
//   storage,
//   whitelist: ['token'],
// };
// const persistedReducer = persistReducer(persistConfig, authReducer);

// const rootReducer = combineReducers({
//     auth: persistedReducer,
//     user: userReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,

//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// const persistor = persistStore(store);

// export { store, persistor };
