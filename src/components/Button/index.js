import PropTypes from "prop-types";
import Spinner from "../Spinner";
import * as S from "./styles";

export default function Button({
    type,
    disabled,
    isLoading,
    children,
    danger,
    onClick,
}) {
    return (
        <S.StyledButton
            type={type}
            disabled={disabled || isLoading}
            danger={danger}
            onClick={onClick}
        >
            {!isLoading && children}
            {isLoading && <Spinner size={16} />}
        </S.StyledButton>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    danger: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: "button",
    disabled: false,
    isLoading: false,
    danger: false,
    onClick: undefined,
};
