export const removeUnwantedProperties = (obj: any, unwantedString: string = "null") => {
    for (let key in obj) {
        if (obj[key] !== null && typeof obj[key] === 'object') {
            removeUnwantedProperties(obj[key]);
        } else if (obj[key] === unwantedString) {
            delete obj[key];
        }
    }
    
    return obj;
}