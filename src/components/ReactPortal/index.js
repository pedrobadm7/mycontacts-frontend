import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export default function ReactPortal({ containerId, children }) {
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement("div");
        container.setAttribute("id", "loader-root");
        document.body.appendChild(container);
    }

    return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
    containerId: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
    containerId: "portal-root",
};
