import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.includes("@") || !options.email.includes(".")) {
        return [
            {
                field: "email",
                message: "Invalid Email",
            },
        ];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "Length must be greater than 2",
            },
        ];
    }

    return null;
};
