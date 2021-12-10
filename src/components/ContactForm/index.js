import { useState } from "react";
import PropTypes from "prop-types";

import isEmailValid from "../../utils/isEmailValid";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import * as S from "./styles";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);

        if (!event.target.value) {
            setErrors((prevState) => [
                ...prevState,
                { field: "name", message: "Nome é obrigatório" },
            ]);
        } else {
            setErrors((prevState) =>
                prevState.filter(({ field }) => field !== "name")
            );
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            const errorAlreadyExists = errors.find(
                ({ field }) => field === "email"
            );
            if (errorAlreadyExists) {
                return;
            }

            setErrors((prevState) => [
                ...prevState,
                { field: "email", message: "E-mail inválido" },
            ]);
        } else {
            setErrors((prevState) =>
                prevState.filter(({ field }) => field !== "email")
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            name,
            email,
            phone,
            category,
        });
    };

    const getErrorMessageByFieldName = (fieldName) => {
        return errors.find(({ field }) => field === fieldName)?.message;
    };

    return (
        <S.Form onSubmit={handleSubmit}>
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
                    error={getErrorMessageByFieldName("email")}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Categoria</option>
                    <option value="instagram">Instagram</option>
                    <option value="discord">Discord</option>
                </Select>
            </FormGroup>

            <S.ButtonContainer>
                <Button type="submit">{buttonLabel}</Button>
            </S.ButtonContainer>
        </S.Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};
