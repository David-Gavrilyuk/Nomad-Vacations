import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FollowersReducer, FollowersState } from "./FollowersReducer";
import { VacationReducer, VacationsState } from "./VacationReducer";
import { UserReducer, UserState } from "./UserReducer";
import { SnackBarState, SnackReducer } from "./SnackBarReducer";

export type RootState = {
  userState: UserState;
  VacationsState: VacationsState;
  FollowersState: FollowersState;
  SnackBarState: SnackBarState;
};

export const reducers = combineReducers({
  userState: UserReducer,
  VacationsState: VacationReducer,
  FollowersState: FollowersReducer,
  SnackBarState: SnackReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }),
});
