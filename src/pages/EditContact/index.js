import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState("");
    const contactFormRef = useRef(null);

    const { id } = useParams();
    const history = useHistory();

    const safeAsyncAction = useSafeAsyncAction();

    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(id);

                safeAsyncAction(() => {
                    contactFormRef.current.setFieldsValues(contact);
                    setIsLoading(false);
                    setContactName(contact.name);
                });
            } catch {
                safeAsyncAction(() => {
                    history.push("/");
                    toast({
                        type: "danger",
                        text: "Contato não encontrado",
                        duration: 3000,
                    });
                });
            }
        }

        loadContact();
    }, [id, history, safeAsyncAction]);

    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };

            const updatedContactData = await ContactsService.updateContact(
                id,
                contact
            );

            setContactName(updatedContactData);

            toast({
                type: "success",
                text: "Contato editado com sucesso!",
                duration: 3000,
            });
        } catch {
            toast({
                type: "danger",
                text: "Ocorreu um erro ao editar o contato",
            });
        }
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader
                title={isLoading ? "Carregando..." : `Editar ${contactName}`}
            />
            <ContactForm
                ref={contactFormRef}
                buttonLabel="Salvar alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}
