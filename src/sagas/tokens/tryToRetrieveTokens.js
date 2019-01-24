import { take, race, put, call, select } from 'redux-saga/effects';

import { AUTH_LOGIN_SUCCESS } from '../../actionType';
import { refreshTokens, setTokens, fetchAuthUserRequest, triedToRetrieveTokens } from '../../actions';
import * as Consts from '../../constants';
import { tokensPersistence } from '../../selectors';

import config from '../config';

import { retrieveTokens, clearTokens } from './storageHandlers';
import { getOAuthTokens } from './oAuth';
import { isAnyTokenExpired } from './utilities';

function* tokensRetrieval() {
    const persistence = yield select(tokensPersistence);

    if (persistence === Consts.tokens.persistence.NONE) {
        yield clearTokens();
        return;
    }

    let { tokens } = yield race({
        tokens: retrieveTokens(),
        loginSuccess: take(AUTH_LOGIN_SUCCESS),
    });

    if (!tokens && config.oAuth.enabled) {
        tokens = yield getOAuthTokens();
        console.log({ tokens });
    }

    if (!tokens) {
        return;
    }

    if (isAnyTokenExpired(tokens)) {
        yield put(refreshTokens(tokens));
    } else {
        yield put(setTokens(tokens));
        yield put(fetchAuthUserRequest());
    }
}

export default function* tryToRetrieveTokens() {
    yield call(tokensRetrieval);

    yield put(triedToRetrieveTokens());
}
