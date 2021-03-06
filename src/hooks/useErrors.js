import { useState } from "react";

const useError = () => {
    const [errors, setErrors] = useState([]);

    const setError = ({ field, message }) => {
        const errorAlreadyExists = errors.find(
            (error) => error.field === field
        );
        if (errorAlreadyExists) {
            return;
        }

        setErrors((prevState) => [...prevState, { field, message }]);
    };

    const removeError = (fieldName) => {
        setErrors((prevState) =>
            prevState.filter(({ field }) => field !== fieldName)
        );
    };

    const getErrorMessageByFieldName = (fieldName) =>
        errors.find(({ field }) => field === fieldName)?.message;

    return {
        errors,
        setError,
        removeError,
        getErrorMessageByFieldName,
    };
};

export default useError;
