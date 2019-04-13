import { eventChannel } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';

import { globalEnv } from '../config';
import { authTokens as authTokensSelector } from '../selectors';
import { refreshTokens } from '../actions';
import { isAnyTokenExpired } from './tokens/utilities';
import config from './config';

function createVisibilityChangeChannel() {
    return eventChannel(emit => {
        function handler() {
            emit(globalEnv.document.visibilityState);
        }

        globalEnv.document.addEventListener('visibilitychange', handler);

        return () => globalEnv.document.removeEventListener('visibilitychange', handler);
    });
}

export default function* watchDocumentVisibilityChange() {
    if (!globalEnv.document || !config.options.verifyTokenExpirationOnTabFocus) {
        return;
    }

    const channel = yield createVisibilityChangeChannel();

    const visibilityStates = {
        VISIBLE: 'visible',
        HIDDEN: 'hidden',
    };

    while (true) {
        const visibilityState = yield take(channel);

        switch (visibilityState) {
            case visibilityStates.VISIBLE: {
                const tokens = yield select(authTokensSelector);

                if (isAnyTokenExpired(tokens)) {
                    yield put(refreshTokens(tokens));
                }

                break;
            }

            case visibilityStates.HIDDEN:
                // NOTE: consider to give developer an option to pause auto. refreshing (switch petrus to 'hibernate mode')
                break;

            default:
        }
    }
}
