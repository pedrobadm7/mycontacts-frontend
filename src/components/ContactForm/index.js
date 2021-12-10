import { useState, useRef } from "react";
import PropTypes from "prop-types";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import * as S from "./styles";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");

    const emailInput = useRef(null);

    const handleClick = () => {
        console.log(emailInput.current.value);
    };

    return (
        <S.Form>
            <button type="button" onClick={handleClick}>
                Loga emailInput
            </button>
            <FormGroup>
                <Input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    defaultValue="pedrobars7a@gmail.com"
                    placeholder="Email"
                    ref={emailInput}
                    onChange={(event) => console.log(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Input placeholder="Telefone" />
            </FormGroup>
            <FormGroup>
                <Select>
                    <option value="instagram">Instagram</option>
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
