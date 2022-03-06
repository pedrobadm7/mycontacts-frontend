import PropTypes from "prop-types";

import * as S from "./styles";

export default function Spinner({ size }) {
    return <S.StyledSpinner size={size} />;
}

Spinner.propTypes = {
    size: PropTypes.number,
};

Spinner.defaultProps = {
    size: 32,
};
