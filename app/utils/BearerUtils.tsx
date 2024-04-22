export const hasTokenDefinedInEnv = (): boolean => {
    return process.env.NEXT_PUBLIC_API_BEARER_TOKEN && process.env.NEXT_PUBLIC_API_BEARER_TOKEN.startsWith("ey");
}

export const hasApiKeyDefinedInEnv = (): boolean => {
    return process.env.NEXT_PUBLIC_API_KEY !== null && process.env.NEXT_PUBLIC_API_KEY !== undefined;
}

export const hasBothTokenAndApiKeyDefined = (): boolean => {
    return hasTokenDefinedInEnv() && hasApiKeyDefinedInEnv();
}

export const isValidJwtBearerToken = (token: string): boolean => {
    return token && token.startsWith("ey");
}