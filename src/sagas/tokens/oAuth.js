import config from '../config';

export function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
    } = config.oAuth;

    // handle server side use
    if (typeof window === 'undefined') {
        return;
    }

    if (!location || !validateRedirectUrl(config.oAuth, window.location)) {
        return;
    }

    const searchParams = parseRedirectUrlParams(window.location);

    if (!searchParams.accessToken) {
        const result = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken = enforceAccessTokenScheme(searchParams);
    const refreshToken = enforceRefreshTokenScheme(searchParams);

    // eslint-disable-next-line
    return {
        accessToken,
        refreshToken,
    };
}
