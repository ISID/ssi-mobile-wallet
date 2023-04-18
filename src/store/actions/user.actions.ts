import {Action, CombinedState} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {getUsers as getUsersFromStorage, updateUser, createUser as userCreate} from '../../services/userService';
import {BasicUser, IAddIdentifierArgs, IUser, RootState} from '../../types';
import {IContactState} from '../../types/store/contact.types';
import {
  CREATE_USER_FAILED,
  CREATE_USER_SUCCESS,
  GET_USERS_FAILED,
  GET_USERS_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS, PIN_VERIFICATION_REQUIRED,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  USERS_LOADING,
} from '../../types/store/user.action.types';
import {IUserState} from '../../types/store/user.types';

import {getContacts} from './contact.actions';
import {getVerifiableCredentials} from './credential.actions';
import store from "../index";

export const createUser = (args: BasicUser): ThunkAction<Promise<IUser>, RootState, unknown, Action> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    dispatch({type: USERS_LOADING});
    return userCreate(args)
      .then((user: IUser) => {
        dispatch({type: CREATE_USER_SUCCESS, payload: user})
        return user
      })
      .catch((error: Error) => {
        dispatch({type: CREATE_USER_FAILED})
        return Promise.reject(error)
      });
  };
};

export const getUsers = (): ThunkAction<Promise<void>, RootState, unknown, Action> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    dispatch({type: USERS_LOADING});
    getUsersFromStorage()
      .then((users: Map<string, IUser>) => dispatch({type: GET_USERS_SUCCESS, payload: users}))
      .catch(() => dispatch({type: GET_USERS_FAILED}));
  };
};

export const addIdentifier = (args: IAddIdentifierArgs): ThunkAction<Promise<void>, RootState, unknown, Action> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>, getState: CombinedState<any>) => {
    dispatch({type: USERS_LOADING});
    const userSate: IUserState = getState().user;
    const userIdentifier = {
      did: args.did,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    };
    // We are currently only supporting a single user right now
    const user: IUser = {
      ...userSate.users.values().next().value,
      identifiers: [...userSate.users.values().next().value.identifiers, userIdentifier],
    };

    updateUser(user)
      .then((user: IUser) => dispatch({type: UPDATE_USER_SUCCESS, payload: user}))
      .catch(() => dispatch({type: UPDATE_USER_FAILED}));
  };
};

export const login = (userId: string): ThunkAction<Promise<void>, RootState, unknown, Action> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>, getState: CombinedState<any>) => {
    dispatch({type: USERS_LOADING});
    await getUsersFromStorage()
      .then(async (users: Map<string, IUser>) => {
        const user = users.get(userId);
        if (user) {
          const maxWaitTime = 5000
          dispatch({type: LOGIN_SUCCESS, payload: user});
          let startTime = Date.now();
          let userState: IUserState = getState().user;
          while (!userState.activeUser && Date.now() - startTime < maxWaitTime) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            userState = getState().user;
          }
          await dispatch(getContacts())
          startTime = Date.now();
          let contactState: IContactState = getState().contact;
          // this will work because we generate a contact from the user so there is always 1 present
          while (contactState.contacts.length === 0 && Date.now() - startTime < maxWaitTime) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            contactState = getState().contact;
          }
          await dispatch(getVerifiableCredentials())
        } else {
          dispatch({type: LOGIN_FAILED});
        }
      })
      .catch(() => dispatch({type: LOGIN_FAILED}));
  };
};

export const logout = (): ThunkAction<Promise<void>, RootState, unknown, Action> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    dispatch({type: USERS_LOADING});
    dispatch({type: LOGOUT_SUCCESS});
  };
};

export const onLogin = () => {
  store.dispatch<any>(login(store.getState().user.users.values().next().value.id))
}

export const onRequiredPINVerification = (isRequired: boolean) => {
  store.dispatch({type: PIN_VERIFICATION_REQUIRED, payload: isRequired})
}
