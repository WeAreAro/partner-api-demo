interface FormField {
    name: string;
    required?: boolean;
}

export const checkRequiredFields = (formData: any, formFields: FormField[]): {} => {
    const requiredFields = {};

    for (const field of formFields) {
        if (field.required) {
            const value = ("" + formData[field.name]).trim();
            if (value === undefined || value === null || value === '' || value === 'null') {
                requiredFields[field.name] = "Field is required";
            }
        }
    }
    return requiredFields;
};