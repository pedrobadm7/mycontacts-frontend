import { useState } from "react";
import ToastMessage from "../ToastMessage";
import * as S from "./styles";

export default function ToastContainer() {
    const [messages] = useState([
        { id: Math.random(), type: "default", text: "Default text" },
        { id: Math.random(), type: "success", text: "Success text" },
        { id: Math.random(), type: "danger", text: "Danger text" },
    ]);

    return (
        <S.Container>
            {messages.map((message) => (
                <ToastMessage
                    key={message.id}
                    type={message.type}
                    text={message.text}
                />
            ))}
        </S.Container>
    );
}
