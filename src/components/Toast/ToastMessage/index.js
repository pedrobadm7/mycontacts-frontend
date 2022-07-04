import PropTypes from "prop-types";
import * as S from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";

export default function ToastMessage({ message, onRemoveMessage }) {
    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }

    return (
        <S.Container type={message.type} onClick={handleRemoveToast}>
            {message.type === "danger" && <img src={xCircleIcon} alt="Error" />}
            {message.type === "success" && (
                <img src={checkCircleIcon} alt="Success" />
            )}
            <strong>{message.text}</strong>
        </S.Container>
    );
}

ToastMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["default", "success", "danger"]),
    }).isRequired,
    onRemoveMessage: PropTypes.func.isRequired,
};
