'use client'
import { socket } from "@/service/socket";

export default function Sender() {
    return (
        <button
        className="absolute bottom-[20px] right-[100px]"
        onClick={() => {
          socket.emit('message', {
            id: `iddasala${new Date()}`,
            text: `Texto enviado na data ${new Date()} `,
            createAt: new Date(),
            author: 'usuario teste',
          });
        }}
      >
        Manda mensagem
      </button>
    )
}