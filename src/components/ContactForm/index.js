/* eslint-disable camelcase */
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { useParams, useHistory } from "react-router-dom";
import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import * as S from "./styles";
import ContactsService from "../../services/ContactsService";

export default function ContactForm({ buttonLabel, request, contact }) {
    const [name, setName] = useState("" || contact.name);
    const [email, setEmail] = useState("" || contact.email);
    const [phone, setPhone] = useState(formatPhone("" || contact.phone));
    const [category, setCategory] = useState("" || contact.category_name);
    const [categoryId, setCategoryId] = useState([]);

    const { id } = useParams();
    const history = useHistory();

    const loadCategories = useCallback(async () => {
        try {
            const categories = await ContactsService.listCategories();

            setCategoryId(categories);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const category_id = categoryId
        .filter((item) => item.name === category)
        .map((item) => item.id);

    useEffect(() => {
        loadCategories();
    }, [loadCategories, category]);

    const { setError, removeError, getErrorMessageByFieldName, errors } =
        useErrors();

    const isFormValid = name && errors.length === 0;

    function handleNameChange(event) {
        setName(event.target.value);

        if (!event.target.value) {
            setError({ field: "name", message: "O nome é obrigatório" });
        } else {
            removeError("name");
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: "email", message: "Email inválido" });
        } else {
            removeError("email");
        }
    }

    function handlePhoneChange(event) {
        setPhone(formatPhone(event.target.value));
    }

    function handleCategory(event) {
        setCategory(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const contactData = {
            name,
            email,
            phone: phone.replace(/\D/g, ""),
            category_id: category_id[0],
        };

        switch (request) {
            case "POST":
                ContactsService.createContact(contactData);
                break;
            case "PUT":
                ContactsService.updateContact(contactData, id);
                break;
            default:
                break;
        }
    }

    function goBack() {
        history.goBack();
    }

    getErrorMessageByFieldName("name");

    return (
        <S.Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName("name")}>
                <Input
                    error={getErrorMessageByFieldName("name")}
                    placeholder="Nome"
                    value={name}
                    onChange={handleNameChange}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName("email")}>
                <Input
                    type="email"
                    error={getErrorMessageByFieldName("email")}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                />
            </FormGroup>

            <FormGroup>
                <Select value={category} onChange={handleCategory}>
                    <option value="">Categoria</option>
                    <option value="DeMolay">DeMolay</option>
                    <option value="Maçom">Maçom</option>
                </Select>
            </FormGroup>

            <S.ButtonContainer>
                <Button type="submit" disabled={!isFormValid} onClick={goBack}>
                    {buttonLabel}
                </Button>
            </S.ButtonContainer>
        </S.Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    contact: PropTypes.objectOf(PropTypes.string),
};

ContactForm.defaultProps = {
    contact: {
        name: "",
        email: "",
        phone: "",
        category_name: "",
    },
};
