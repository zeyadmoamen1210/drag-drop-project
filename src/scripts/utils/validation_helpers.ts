import { validation } from "./validation_types.js"

/**
 * @desc assign pattern validation in inputs
 * @param1 title value : string
 * @param2 description value : string
 * @returns validation rules of title and description : validation[]
 */
export const assignValidateInputs = (titleVal: string, descValue: string): validation[] => {
    const titleInputRule : validation = {
        type: "title",
        value: titleVal,
        required: true,
        minLength: 4,
        maxLength: 30,
    }

    const descInputRule : validation = {
        type: "description",
        value: descValue,
        required: true,
        minLength: 10,
        maxLength: 50,
    }

    return [titleInputRule, descInputRule]
}

/**
 * @desc handle validation errors
 * @param1 input : input validation object
 * @returns error message
 */
export const handleValidationErrors = (inputRule: validation): string => {
    let errorMsg: string = "";
    // required
    if(inputRule.required && inputRule.value.trim().length === 0) {
        errorMsg = `${inputRule.type} is required`;
    }

    // minLength
    if(inputRule.value.trim().length < inputRule.minLength) {
        errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} characters`;
    }

    // maxLength
    if(inputRule.value.trim().length > inputRule.maxLength) {
        errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} characters`;
    }

    return errorMsg;
}