import {type Action, combineReducers, configureStore, type ThunkAction} from '@reduxjs/toolkit'
import {type TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector} from 'react-redux'
import {persistReducer, persistStore} from 'redux-persist'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/lib/constants'
import storage from 'redux-persist/lib/storage'
import {reducers, reducersToPersist} from './store.config'


export const reducerCollection = combineReducers(reducers)

export type ReducerNames = keyof typeof reducers

const persistConfig = {
  key: 'root',
  storage,
  whitelist: reducersToPersist,
  migrate: (state: any) => {
    // console.log('Migration Running!')
    // console.log(state)
    return Promise.resolve(state)
  }
}

const reducer = persistReducer(
  persistConfig,
  reducerCollection)

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER]
    }
  })
})

export const reduxStorePersistor = persistStore(reduxStore)


/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>

export const useAppDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector
