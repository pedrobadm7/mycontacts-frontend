import { useState } from "react";
import PropTypes from "prop-types";

import isEmailValid from "../../utils/isEmailValid";
import useErrors from "../../hooks/useErrors";

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

    const { setError, removeError, getErrorMessageByFieldName } = useErrors();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log({
        //     name,
        //     email,
        //     phone,
        //     category,
        // });
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
