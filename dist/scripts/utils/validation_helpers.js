export const assignValidateInputs = (titleVal, descValue) => {
    const titleInputRule = {
        type: "title",
        value: titleVal,
        required: true,
        minLength: 4,
        maxLength: 30,
    };
    const descInputRule = {
        type: "description",
        value: descValue,
        required: true,
        minLength: 10,
        maxLength: 50,
    };
    return [titleInputRule, descInputRule];
};
export const handleValidationErrors = (inputRule) => {
    let errorMsg = "";
    if (inputRule.required && inputRule.value.trim().length === 0) {
        errorMsg = `${inputRule.type} is required`;
    }
    if (inputRule.value.trim().length < inputRule.minLength) {
        errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} characters`;
    }
    if (inputRule.value.trim().length > inputRule.maxLength) {
        errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} characters`;
    }
    return errorMsg;
};
//# sourceMappingURL=validation_helpers.js.map