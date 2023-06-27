'use client';

export interface Field {
    name: string,
    type?: InputType,
    title?: string,
    possibleValues?: PossibleValues,
}

export enum InputType {
    String,
    Number,
    Enum,
    Phone,
    Email
}

interface PossibleValues {
    [key: string]: number;
}

interface Props {
    error?: string,
    value?: string | number,
    possibleValues?: PossibleValues,

    title: string,
    name: string,
    type: InputType,

    onChange: (e: { target: { name: any; value: any; } }) => void
}

const transformTitle = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult
}

export const handleChange = (e: { target: { name: any; value: any; }; }, type: any, formData: any, setFormData: (formData: any) => void) => {
    let value = e.target.value

    if (type === InputType.Number) {
        value = parseInt(value)
    }

    setFormData({
        ...formData,
        [e.target.name]: value
    })
}

export const createInputFields = (fields: Field[], formData: any, errors: any, setFormData: any) => {
    const inputFields = [];

    for (const field of fields) {
        const name = field.name;

        const title = field?.title ?? transformTitle(name);
        const type = field?.type ?? InputType.String;

        const value = formData[name]
        const error = errors[name]

        inputFields.push(
            <InputField
                title={title}
                name={name}
                type={type}

                possibleValues={field?.possibleValues}
                value={value}
                error={error}
                onChange={(e) => handleChange(e, type, formData, setFormData)}
            />
        )
    }

    return inputFields
}

export const getPossibleValues = (type: any) => {
    let possibleValues = {} as any

    for (const [k, v] of Object.entries(type)) {
        possibleValues[k] = v
    }

    return possibleValues
}

export const InputField = (props: Props) => {
    const renderTextField = (numeric = false) => {
        return (
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor={props.name}>
                    {props.title}
                </label>
                <input
                    className="form-text shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={!numeric ? "text" : "number"}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange} />
                {props.error && <span
                    className="text-red-500 text-xs italic">{props.error}</span>}
            </div>)
    }
    const renderEnumOptions = () => {
        const enumOptions: JSX.Element[] = [];

        for (const [key, value] of Object.entries(props.possibleValues as any)) {
            enumOptions.push(<option value={value as any}>{key}</option>)
        }

        return enumOptions
    }

    if (props.possibleValues) {
        return (<div><label
            className="block text-gray-700 text-sm font-bold mt-2 mb-2"
            htmlFor={props.name}>{props.title}</label>
            <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={props.name}
                value={props.value}
                name={props.name}
                onChange={props.onChange}>
                {renderEnumOptions()}
            </select></div>)
    } else {
        if (props.type === InputType.String) {
            return renderTextField()
        }
        else if (props.type === InputType.Number) {
            return renderTextField(true)
        } else if (props.type === InputType.Phone) {
            return renderTextField()
        }
        return <div></div>
    }
}