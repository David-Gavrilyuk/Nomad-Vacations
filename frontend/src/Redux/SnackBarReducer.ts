export class SnackBarState {
  snackbarOpen: boolean = false;
  snackbarType: string = "success";
  snackbarMessage: string = "";
}

export enum SnackActionType {
  setSnack = "setSnack",
}

export interface SnackAction {
  type: SnackActionType;
  payload?: any;
}

export const setSnackNote = (open: boolean, style: string, message: string) => {
  return {
    type: SnackActionType.setSnack,
    payload: {
      open,
      style,
      message,
    },
  };
};

export function SnackReducer(currentState: SnackBarState = new SnackBarState(), action: SnackAction): SnackBarState {
  const newState = { ...currentState };

  switch (action.type) {
    case SnackActionType.setSnack:
      newState.snackbarOpen = action.payload.open;
      newState.snackbarType = action.payload.style;
      newState.snackbarMessage = action.payload.message;
      break;
  }

  return newState;
}
