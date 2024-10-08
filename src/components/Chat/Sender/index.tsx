'use client'
import { socket } from "@/service/socket";
import { formSendMessageSchema, FormSendMessageSchema } from "@/types/Chat/components/FormSendMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "@/context/User/user-context";
import './index.css';

interface SenderProps {
  id: string;
}

export default function Sender({ id }: SenderProps) {
  const { user } = useContext(UserContext);

  const { register, handleSubmit, reset } = useForm<FormSendMessageSchema>({
    resolver: zodResolver(formSendMessageSchema),
  });

  const sendMessage = ({ message }: FormSendMessageSchema) => {
    const newMessage = {
      idAuthor: user?.uid,
      text: message,
      createAt: new Date(),
      author: user?.name,
    }

    socket.emit('send-message', { newMessage, id });

    reset();
  }

  return (
    <form className="form-send-message" onSubmit={handleSubmit(sendMessage)}>
      <input
        type="text"
        className="input"
        {...register('message')}
        placeholder="Conversar com o chat"
      />
    </form>
  )
}