//Initial state
export class UserState {
  public user: any | undefined;
}

//Action Types
export enum userActionType {
  login = "login",
  logout = "logout",
}

//Action data structure
export interface userAction {
  type: userActionType;
  payload?: any;
}

//Dispatch Functions
export const login = (user: any, token?: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  if (token) localStorage.setItem("token", token);
  return {
    type: userActionType.login,
    payload: user,
  };
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  return {
    type: userActionType.logout,
    payload: null,
  };
};

//Reducer
export function UserReducer(currentState: UserState = new UserState(), action: userAction): UserState {
  const newState = { ...currentState };

  switch (action.type) {
    case userActionType.login:
      newState.user = action.payload;
      break;
    case userActionType.logout:
      newState.user = undefined;
  }

  return newState;
}
