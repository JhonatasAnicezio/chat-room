  'use client'
  import { socket } from "@/service/socket";
  import { formSendMessageSchema, FormSendMessageSchema } from "@/types/Chat/components/FormSendMessage";
  import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
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
      <form className="flex items-center justify-center w-full p-5" onSubmit={handleSubmit(sendMessage)}>
        <input
          type="text"
          className="bg-[#383A40] focus:outline-none px-4 py-2.5 rounded-md text-[#D4D7DB] w-full resize-none custom-scrollbar"
          {...register('message')}
          placeholder="Conversar com o chat"
        />
      </form>
    )
  }