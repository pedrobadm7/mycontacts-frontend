import { Link } from "react-router-dom";

import { useEffect, useState, useMemo, useCallback } from "react";
import * as S from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import sad from "../../assets/images/sad.svg";
import emptyBox from "../../assets/images/empty-box.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const filteredContacts = useMemo(
        () =>
            contacts.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [contacts, searchTerm]
    );

    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
        } catch {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleTryAgain() {
        loadContacts();
    }

    function handleDeleteContact(contact) {
        setIsDeleteModalVisible(true);
        setContactBeingDeleted(contact);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalVisible(false);
        setContactBeingDeleted(null);
    }

    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);
            await ContactsService.deleteContact(contactBeingDeleted.id);

            setContacts((prevState) =>
                prevState.filter(
                    (contact) => contact.id !== contactBeingDeleted.id
                )
            );
            handleCloseDeleteModal();

            toast({ type: "success", text: "Contato deletado com sucesso!" });
        } catch {
            toast({
                type: "danger",
                text: "Ocorreu um erro ao deletar o contato!",
            });
        } finally {
            setIsLoadingDelete(false);
        }
    }

    return (
        <S.Container>
            <Loader isLoading={isLoading} />

            <Modal
                danger
                isLoading={isLoadingDelete}
                visible={isDeleteModalVisible}
                title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?"`}
                confirmLabel="Deletar"
                onCancel={handleCloseDeleteModal}
                onConfirm={handleConfirmDeleteContact}
            >
                <p>Esta ação não poderá ser desfeita</p>
            </Modal>

            {contacts.length > 0 && !hasError && (
                <S.InputSearchContainer>
                    <input
                        value={searchTerm}
                        type="text"
                        placeholder="Pesquisar contato"
                        onChange={handleChangeSearchTerm}
                    />
                </S.InputSearchContainer>
            )}

            <S.Header
                justifyContent={
                    // eslint-disable-next-line no-nested-ternary
                    hasError
                        ? "flex-end"
                        : contacts.length > 0
                        ? "space-between"
                        : "center"
                }
            >
                {!!(!hasError && contacts.length > 0) && (
                    <strong>
                        {filteredContacts.length}{" "}
                        {filteredContacts.length === 1
                            ? "contato"
                            : " contatos"}
                    </strong>
                )}
                <Link to="/new">Novo Contato</Link>
            </S.Header>

            {hasError && (
                <S.ErrorContainer>
                    <img src={sad} alt="Sad" />
                    <div className="details">
                        <strong>
                            Ocorreu um erro ao obter os seus contatos!
                        </strong>

                        <Button type="button" onClick={handleTryAgain}>
                            Tentar novamente
                        </Button>
                    </div>
                </S.ErrorContainer>
            )}

            {!hasError && (
                <>
                    {contacts.length < 1 && !isLoading && (
                        <S.EmptyListContainer>
                            <img src={emptyBox} alt="Empty box" />
                            <p>
                                Você ainda não tem nenhum contato cadastrado!
                                Clique no botão <strong>”Novo contato” </strong>
                                à cima para cadastrar o seu primeiro!
                            </p>
                        </S.EmptyListContainer>
                    )}

                    {contacts.length > 0 && filteredContacts.length < 1 && (
                        <S.SearchNotFondContainer>
                            <img
                                src={magnifierQuestion}
                                alt="Magnifier Question"
                            />

                            <span>
                                Nenhum resultado foi encontrado para{" "}
                                <strong>{searchTerm}</strong>
                            </span>
                        </S.SearchNotFondContainer>
                    )}

                    {filteredContacts.length > 0 && (
                        <S.ListHeader orderBy={orderBy}>
                            <button type="button" onClick={handleToggleOrderBy}>
                                <span>Nome</span>
                                <img src={arrow} alt="Arrow" />
                            </button>
                        </S.ListHeader>
                    )}

                    {filteredContacts.map((contact) => (
                        <S.Card key={contact.id}>
                            <div className="info">
                                <div className="contact-name">
                                    <strong>{contact.name}</strong>
                                    {contact.category_name && (
                                        <small>{contact.category_name}</small>
                                    )}
                                </div>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                            </div>
                            <div className="actions">
                                <Link to={`/edit/${contact.id}`}>
                                    <img src={edit} alt="Edit" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteContact(contact)}
                                >
                                    <img src={trash} alt="Delete" />
                                </button>
                            </div>
                        </S.Card>
                    ))}
                </>
            )}
        </S.Container>
    );
}
