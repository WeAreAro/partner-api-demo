export const hasTokenDefinedInEnv = () => {
    return process.env.NEXT_PUBLIC_API_BEARER_TOKEN && process.env.NEXT_PUBLIC_API_BEARER_TOKEN.startsWith("ey");
}

export const isValidJwtBearerToken = (token: string) => {
    return token && token.startsWith("ey");
}