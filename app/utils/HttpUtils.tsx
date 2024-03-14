export async function fetchWithTimeout(controller: AbortController, resource: string, options = {}) {
    // @ts-ignore
    const {timeout = 30000} = options;

    // const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}