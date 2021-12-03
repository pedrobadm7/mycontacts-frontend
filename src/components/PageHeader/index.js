import { Link } from "react-router-dom";
import propTypes from "prop-types";
import * as S from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";

export default function PageHeader({ title }) {
    return (
        <S.Container>
            <Link to="/">
                <img src={arrow} alt="Back" />
                <span>Voltar</span>
            </Link>
            <h1>{title}</h1>
        </S.Container>
    );
}

PageHeader.propTypes = {
    title: propTypes.string.isRequired,
};
