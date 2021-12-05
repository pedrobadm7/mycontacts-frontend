import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import * as S from "./styles";

import Button from "../Button";

export default function Modal({ danger }) {
    return ReactDOM.createPortal(
        <S.Overlay>
            <S.Container danger={danger}>
                <h1>Título do Modal</h1>
                <p>Corpo do Modal</p>
                <S.Footer>
                    <button type="button" className="cancel-button">
                        Cancelar
                    </button>
                    <Button type="button" danger={danger}>
                        Deletar
                    </Button>
                </S.Footer>
            </S.Container>
        </S.Overlay>,
        document.getElementById("modal-root")
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
};

Modal.defaultProps = {
    danger: false,
};
