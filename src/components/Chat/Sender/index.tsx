'use client'
import { socket } from "@/service/socket";
import { formSendMessageSchema, FormSendMessageSchema } from "@/types/Chat/components/FormSendMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Sender() {
  const { register, handleSubmit, reset } = useForm<FormSendMessageSchema>({
    resolver: zodResolver(formSendMessageSchema),
  });

  const sendMessage = ({ message }: FormSendMessageSchema) => {
    socket.emit('message', {
      id: `iddasala${new Date()}`,
      text: message,
      createAt: new Date(),
      author: 'usuario teste',
    });

    reset();
  }

  return (
    <form onSubmit={handleSubmit(sendMessage)}>
      <input
        className="text-black"
        {...register('message')}
        type="text"
        placeholder="Conversar com o chat"
      />
    </form>
  )
}