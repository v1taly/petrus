import { login, stopLogin, logout, setTokens, refreshTokens, setTokensPersistence } from './actions';
import { authUser, isLoggedIn, isLoggingIn, loginErrors, tokensPersistence } from './selectors';

export const actions = {
    login,
    stopLogin,
    logout,
    setTokens,
    refreshTokens,
    setTokensPersistence,
};

export const selectors = {
    authUser,
    isLoggedIn,
    isLoggingIn,
    loginErrors,
    tokensPersistence,
};

export * as actionTypes from './actionType';

export { configure, withAuthSession, getAuthStateChannel } from './sagas';

export * as constants from './constants';
