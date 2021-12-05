import * as S from "./styles";

import Button from "../Button";

export default function Modal() {
    return (
        <S.Overlay>
            <S.Container>
                <h1>Título do Modal</h1>
                <p>Corpo do Modal</p>
                <S.Footer>
                    <button type="button" className="cancel-button">
                        Cancelar
                    </button>
                    <Button type="button">Deletar</Button>
                </S.Footer>
            </S.Container>
        </S.Overlay>
    );
}
