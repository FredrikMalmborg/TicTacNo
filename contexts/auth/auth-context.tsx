import React from "react";
import { TSignInAction } from "./auth-provider";

export interface IUserState {
  isLoading: boolean;
  isSignedOut: boolean;
  userToken: string | null;
}

type TReducerAction =
  | { type: "RESTORE"; token: string | null }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" };

export const INITIAL_STATE: IUserState = {
  isLoading: true,
  isSignedOut: false,
  userToken: null,
};

export const userState = (prevState: IUserState, action: TReducerAction) => {
  switch (action.type) {
    case "RESTORE":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignedOut: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignedOut: true,
        userToken: null,
      };
  }
}

const AuthContext = React.createContext({ authContext: {
  signIn: (action: TSignInAction) => {},
  signOut: () => {},
  signUp: (data: any) => {}
}, user: INITIAL_STATE });

export default AuthContext;