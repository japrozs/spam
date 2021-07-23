import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type TextFieldProps = {
    name: string;
    label: string;
    placeholder: string;
};

export const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    label,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Textarea
                _placeholder={{ color: "#ccc" }}
                borderColor="gray.300"
                {...field}
                {...props}
                id={field.name}
                placeholder={placeholder}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
