import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadContact() {
            try {
                const contactData = await ContactsService.getContactById(id);
                setIsLoading(false);
                console.log({ contactData });
            } catch {
                history.push("/");
                toast({
                    type: "danger",
                    text: "Contato não encontrado",
                });
            }
        }

        loadContact();
    }, [id, history]);

    function handleSubmit() {}

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader title="Editar " />
            <ContactForm
                buttonLabel="Salvar alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}
