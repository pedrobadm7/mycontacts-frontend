import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";

export default function EditContact() {
    const [contactId, setContactId] = useState("");
    const [contact, setContact] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const loadContactById = useCallback(async () => {
        try {
            setIsLoading(true);
            const contactById = await ContactsService.listContactsById(
                contactId
            );

            setContact(contactById);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [contactId]);

    useEffect(() => {
        loadContactById();
        setContactId(id);
    }, [loadContactById, id]);

    return (
        <>
            <Loader isLoading={isLoading} />
            {!isLoading && (
                <>
                    <PageHeader title={`Editar ${contact.name}`} />
                    <ContactForm
                        buttonLabel="Salvar alterações"
                        request="PUT"
                    />
                </>
            )}
        </>
    );
}
