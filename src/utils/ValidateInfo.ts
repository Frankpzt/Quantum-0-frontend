import { IErrors } from "../interfaces/auth";

const checkEmailFormatIsNotValid = (email: string) =>
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(email);

const checkPasswordFormatIsNotValid = (password: string) =>
    !/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@! #^%_=}{":;'/.,*><?&])[A-Za-z\d$@! #^%_=}{":;'/.,*><?&]{8,})/gm.test(
        password
    );

const nullErrorMessageMapping: {
    [key: string]: string;
} = {
    firstname: "first name.",
    lastname: "last name.",
    email: "email address.",
    password: "password.",
    confirmPassword: "password again.",
};

const ValidateInfo = (userInput: IErrors) => {
    const errors: IErrors = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        isValidated: true,
    };

    // check if input is null
    Object.keys(userInput).forEach((key: string) => {
        if (!userInput[key]) {
            errors[key] = `Please enter your ${nullErrorMessageMapping[key]}`;
            errors.isValidated = false;
        }
    });

    if (userInput.email && checkEmailFormatIsNotValid(userInput.email)) {
        errors.email = "Email address is invalid.";
        errors.isValidated = false;
    }

    if (
        userInput.password &&
        checkPasswordFormatIsNotValid(userInput.password)
    ) {
        errors.password = "Password format is invalid.";
        errors.isValidated = false;
    }

    if (userInput.confirmPassword) {
        if (userInput.confirmPassword !== userInput.password) {
            errors.confirmPassword =
                "Password do not match, please re-enter it.";
            errors.isValidated = false;
        }
    }
    return errors;
};

export default ValidateInfo;
