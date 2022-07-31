import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import * as S from "./styles";

import Button from "../Button";

export default function Modal({
    danger,
    title,
    children,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
}) {
    return ReactDOM.createPortal(
        <S.Overlay>
            <S.Container danger={danger}>
                <h1>{title}</h1>
                <div className="modal-body">{children}</div>
                <S.Footer>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>
                    <Button type="button" danger={danger} onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                </S.Footer>
            </S.Container>
        </S.Overlay>,
        document.getElementById("modal-root")
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
    danger: false,
    cancelLabel: "Cancelar",
    confirmLabel: "Confirmar",
};
