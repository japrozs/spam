import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputProps,
    ComponentWithAs,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type EditorFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
};

// '' -> string
// 'error message stuff' -> true

export const EditorField: React.FC<EditorFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel fontSize="xl" fontWeight="bold" htmlFor={field.name}>
                {label}
            </FormLabel>
            <Input
                borderColor="gray.300"
                fontWeight="medium"
                _placeholder={{ color: "#ccc" }}
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
