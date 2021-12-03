import * as S from "./styles";

import logo from "../../assets/images/logo.svg";

export default function Header() {
    return (
        <S.Container>
            <img src={logo} alt="MyContacts" width="201" />
        </S.Container>
    );
}
