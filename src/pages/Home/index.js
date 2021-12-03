import * as S from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

export default function Home() {
    return (
        <S.Container>
            <S.InputSearchContainer>
                <input type="text" placeholder="Pesquisar contato" />
            </S.InputSearchContainer>
            <S.Header>
                <strong>3 contatos</strong>
                <a href="/">Novo Contato</a>
            </S.Header>

            <S.ListContainer>
                <header>
                    <button type="button">
                        <span>Nome</span>
                        <img src={arrow} alt="Arrow" />
                    </button>
                </header>

                <S.Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Pedro Barros</strong>
                            <small>Instagram</small>
                        </div>
                        <span>pedrobars7a@gmail.com</span>
                        <span>(73) 9 9957-7204</span>
                    </div>
                    <div className="actions">
                        <a href="/">
                            <img src={edit} alt="Edit" />
                        </a>
                        <button type="button">
                            <img src={trash} alt="Delete" />
                        </button>
                    </div>
                </S.Card>
                <S.Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Pedro Barros</strong>
                            <small>Instagram</small>
                        </div>
                        <span>pedrobars7a@gmail.com</span>
                        <span>(73) 9 9957-7204</span>
                    </div>
                    <div className="actions">
                        <a href="/">
                            <img src={edit} alt="Edit" />
                        </a>
                        <button type="button">
                            <img src={trash} alt="Delete" />
                        </button>
                    </div>
                </S.Card>
            </S.ListContainer>
        </S.Container>
    );
}
