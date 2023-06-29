import { Vacation } from "../Models/Vacation";

//Initial state
export class VacationsState {
  public allVacations: Vacation[] = [];
}

//Action Types
export enum VacationActionType {
  getVacations = "getVacations",
  addVacation = "addVacation",
  editVacation = "editVacation",
  deleteVacation = "deleteVacation",
}

//Action data structure
export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

//Dispatch Functions
export const getVacationsAction = (allVacations: Vacation[]) => {
  return { type: VacationActionType.getVacations, payload: allVacations };
};

export const addVacationAction = (newVacation: Vacation) => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const editVacationAction = (editedVacation: Vacation) => {
  return { type: VacationActionType.editVacation, payload: editedVacation };
};

export const deleteVacationAction = (vacation_id: number) => {
  return { type: VacationActionType.deleteVacation, payload: vacation_id };
};

//Reducer
export function VacationReducer(currentState: VacationsState = new VacationsState(), action: VacationAction): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.getVacations:
      newState.allVacations = action.payload;
      break;
    case VacationActionType.addVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.editVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.deleteVacation:
      newState.allVacations = [...newState.allVacations].filter((item) => item.vacation_id !== action.payload);
      break;
  }

  return newState;
}
