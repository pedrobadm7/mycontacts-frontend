import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import * as S from "./styles";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useSafeAsyncState([]);
    const [isLoadingCategories, setIsLoadingCategories] =
        useSafeAsyncState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setError, removeError, getErrorMessageByFieldName, errors } =
        useErrors();

    const isFormValid = name && errors.length === 0;

    useImperativeHandle(
        ref,
        () => ({
            setFieldsValues: (contact) => {
                setName(contact.name ?? "");
                setEmail(contact.email ?? "");
                setPhone(formatPhone(contact.phone ?? ""));
                setCategoryId(contact.category_id ?? "");
            },
            resetFields: () => {
                setName("");
                setEmail("");
                setPhone("");
                setCategoryId("");
            },
        }),
        []
    );

    // useEffect(() => {
    //     const refObject = ref;
    //     refObject.current = {
    //         setFieldsValues: (contact) => {
    //             setName(contact.name);
    //             setEmail(contact.email);
    //             setPhone(contact.phone);
    //             setCategoryId(contact.category_id);
    //         },
    //     };
    // }, [ref]);

    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesList = await CategoriesService.listCategories();

                setCategories(categoriesList);
            } catch {
            } finally {
                setIsLoadingCategories(false);
            }
        }

        loadCategories();
    }, [setCategories, setIsLoadingCategories]);

    const handleNameChange = (event) => {
        setName(event.target.value);

        if (!event.target.value) {
            setError({ field: "name", message: "O nome é obrigatório" });
        } else {
            removeError("name");
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: "email", message: "Email inválido" });
        } else {
            removeError("email");
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(formatPhone(event.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onSubmit({
            name,
            email,
            phone: phone.replace(/\D/g, ""),
            categoryId,
        });

        setIsSubmitting(false);
    };

    getErrorMessageByFieldName("name");

    return (
        <S.Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName("name")}>
                <Input
                    error={getErrorMessageByFieldName("name")}
                    placeholder="Nome"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName("email")}>
                <Input
                    type="email"
                    error={getErrorMessageByFieldName("email")}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={isLoadingCategories || isSubmitting}
                >
                    <option value="">Sem Categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </FormGroup>

            <S.ButtonContainer>
                <Button
                    type="submit"
                    disabled={!isFormValid}
                    isLoading={isSubmitting}
                >
                    {buttonLabel}
                </Button>
            </S.ButtonContainer>
        </S.Form>
    );
});

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
