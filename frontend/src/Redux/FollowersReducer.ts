import Follower from "../Models/Follower";

//Initial state
export class FollowersState {
  public followers: Follower[] = [];
}

//Action Types
export enum FollowersActionType {
  allFollowers = "allLikes",
  like = "like",
  unlike = "unlike",
}

//Action data structure
export interface FollowersAction {
  type: FollowersActionType;
  payload?: any;
}

//Dispatch Functions
export const allFollowers = (allFollowers: Follower[]) => {
  return {
    type: FollowersActionType.allFollowers,
    payload: allFollowers,
  };
};

export const like = (like?: Follower) => {
  return {
    type: FollowersActionType.like,
    payload: like ? [like] : undefined,
  };
};

export const unlike = (unlike: Follower) => {
  return {
    type: FollowersActionType.unlike,
    payload: unlike,
  };
};

//Reducer
export function FollowersReducer(currentState: FollowersState = new FollowersState(), action: FollowersAction): FollowersState {
  const newState = { ...currentState };

  switch (action.type) {
    case FollowersActionType.allFollowers:
      newState.followers = action.payload || [];
      break;
    case FollowersActionType.like:
      newState.followers = action.payload ? [...newState.followers, ...action.payload] : newState.followers;
      break;
    case FollowersActionType.unlike:
      if (action.payload) {
        newState.followers = newState.followers.filter((item) => item.user_id !== action.payload.user_id || item.vacation_id !== action.payload.vacation_id);
      }
      break;
  }

  return newState;
}
