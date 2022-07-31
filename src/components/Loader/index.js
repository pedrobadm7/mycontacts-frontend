import PropTypes from "prop-types";
import * as S from "./styles";
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";

export default function Loader({ isLoading }) {
    if (!isLoading) return null;

    let container = document.getElementById("loader-root");
    if (!container) {
        container = document.createElement("div");
        container.setAttribute("id", "loader-root");
        document.body.appendChild(container);
    }

    return (
        <ReactPortal containerId="loader-root">
            <S.Overlay>
                <Spinner size={90} />
            </S.Overlay>
        </ReactPortal>
    );
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
