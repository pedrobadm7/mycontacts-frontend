import { useState, useEffect } from "react";
import { toastEventManager } from "../../../utils/toast";
import ToastMessage from "../ToastMessage";
import * as S from "./styles";

export default function ToastContainer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function handleAddToast({ type, text }) {
            setMessages((prevState) => [
                ...prevState,
                { id: Math.random(), type, text },
            ]);
        }

        toastEventManager.on("addtoast", handleAddToast);

        return () => {
            toastEventManager.removeListener("addtoast", handleAddToast);
        };
    }, []);

    function handleRemoveMessage(id) {
        setMessages((prevState) =>
            prevState.filter((message) => message.id !== id)
        );
    }

    return (
        <S.Container>
            {messages.map((message) => (
                <ToastMessage
                    key={message.id}
                    message={message}
                    onRemoveMessage={handleRemoveMessage}
                />
            ))}
        </S.Container>
    );
}
