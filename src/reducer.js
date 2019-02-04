import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    SET_AUTH_TOKENS,
    AUTH_REFRESH_TOKEN,
    AUTH_REFRESH_TOKEN_FAILURE,
    AUTH_REFRESH_TOKEN_SUCCESS,
    FETCH_AUTH_USER_REQUEST,
    FETCH_AUTH_USER_SUCCESS,
    FETCH_AUTH_USER_FAILURE,
    SET_TOKENS_PERSISTENCE,
    RETRIEVE_TOKENS_REQUEST,
    RETRIEVE_TOKENS_RESOLVE,
} from './actionType';

export const factoryReducer = customInitialState => {
    const initialState = {
        user: null,
        isLoggedIn: false,
        isLoggingIn: false,
        loginError: null,
        tokens: {},
        isRefreshing: false,
        isUserFetching: false,
        triedToRetrieveTokens: false,
        isRetrievingTokens: false,
        ...customInitialState,
    };

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case AUTH_LOGIN:
                return {
                    ...state,
                    isLoggedIn: false,
                    isLoggingIn: true,
                    loginError: null,
                    isUserFetching: true,
                };

            case AUTH_LOGIN_SUCCESS:
                return {
                    ...state,
                    isLoggedIn: true,
                    isLoggingIn: false,
                    user: action.user,
                    loginError: null,
                    isUserFetching: false,
                };

            case AUTH_LOGIN_FAILURE:
                return {
                    ...state,
                    isLoggedIn: false,
                    isLoggingIn: false,
                    user: null,
                    loginError: action.error,
                    isUserFetching: false,
                };

            case SET_AUTH_TOKENS:
                return {
                    ...state,
                    isLoggedIn: true,
                    tokens: {
                        ...state.tokens,
                        ...action.tokens,
                    },
                };

            case AUTH_LOGOUT:
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                    tokens: {},
                };

            case AUTH_REFRESH_TOKEN:
                return {
                    ...state,
                    isRefreshing: true,
                };

            case AUTH_REFRESH_TOKEN_SUCCESS:
                return {
                    ...state,
                    isRefreshing: false,
                    tokens: {
                        ...state.tokens,
                        ...action.tokens,
                    },
                };

            case AUTH_REFRESH_TOKEN_FAILURE:
                return {
                    ...state,
                    isRefreshing: false,
                };

            case FETCH_AUTH_USER_REQUEST:
                return {
                    ...state,
                    isUserFetching: true,
                };

            case FETCH_AUTH_USER_SUCCESS:
                return {
                    ...state,
                    user: action.user,
                    isUserFetching: false,
                };

            case FETCH_AUTH_USER_FAILURE:
                return {
                    ...state,
                    isUserFetching: false,
                };

            case RETRIEVE_TOKENS_REQUEST:
                return {
                    ...state,
                    isRetrievingTokens: true,
                    triedToRetrieveTokens: false,
                };

            case RETRIEVE_TOKENS_RESOLVE:
                return {
                    ...state,
                    isRetrievingTokens: false,
                    triedToRetrieveTokens: true,
                };

            case SET_TOKENS_PERSISTENCE:
                return {
                    ...state,
                    tokensPersistence: action.persistence,
                };

            default:
                return state;
        }
    };

    return reducer;
};
