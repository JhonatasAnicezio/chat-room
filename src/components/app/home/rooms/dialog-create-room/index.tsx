'use client'
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { createRoomSchema, CreateRoomSchema } from "./create-room-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { createRoom } from "@/service/rooms";
import './index.css';
import { UserContext } from "@/context/User/user-context";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
    const [subjects, setSubjects] = useState<string[]>([]);
    const [valueInputSubject, setValueInputSubject] = useState<string>("");

    const router = useRouter();

    const { user } = useContext(UserContext);

    if (!user) {
        return null;
    }

    const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm<CreateRoomSchema>({
        resolver: zodResolver(createRoomSchema),
    });

    setValue('idAuthor', user.uid);

    const addSubject = (subject: string) => {
        if (subjects.length < 3 && subject.length >= 4) {
            setSubjects((prevSubjects) => [...prevSubjects, subject]);
            setValue('subjects', [...subjects, subject]); // Atualiza o campo 'subject' com os novos valores
            setValueInputSubject(''); // Limpa o campo de input
        }
    };

    const removeSubject = (index: number) => {
        const newSubjects = subjects.filter((_e, i) => index !== i);

        setSubjects((prevSubjects) => [...newSubjects]);
        setValue('subjects', [...newSubjects]); // Atualiza o campo 'subject' com os novos valores
        setValueInputSubject(''); // Limpa o campo de input
    };

    const ConsoleCreateRoom = async ({ name, subjects }: CreateRoomSchema) => {
        const token = localStorage.getItem('token-auth');

        if (token) {
            await createRoom({ name, subjects, idAuthor: user.uid }, token);

            router.refresh();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-create">Criar Sala</button>
            </DialogTrigger>
            <DialogContent className="container-dialog">
                <DialogHeader>
                    <DialogTitle>Criar sala de bate-papo</DialogTitle>
                    <DialogDescription>
                        Crie aqui sua sala de bate papo e converse sobre assuntos em comum com pessoas do mundo inteiro
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(ConsoleCreateRoom)}
                    className="form-create-room"
                >
                    <div className="div-create-room">
                        <label htmlFor="name">
                            NOME DA SALA
                        </label>
                        <input
                            {...register('name')}
                            maxLength={20}
                        />
                    </div>

                    {/* <div className="div-create-room">
                        <label htmlFor="name">
                            URL DA IMAGEM
                        </label>
                        <input
                            {...register('imgUrl')}
                            maxLength={20}
                        />
                    </div> */}

                    <div className="div-create-room">
                        <label htmlFor="name">
                            ASSUNTOS
                        </label>
                        <input
                            disabled={subjects.length === 3 ? true : false}
                            onChange={({ target: { value } }) => setValueInputSubject(value)}
                            value={valueInputSubject}
                            placeholder="Adicione até 3 assuntos"
                            maxLength={15}
                            id="display-name"
                        />
                        <button onClick={() => addSubject(valueInputSubject)} type="button">Adicionar</button>
                    </div>

                    <div className="div-subject-create">
                        {subjects.map((e, index) =>
                            <span key={index} className="relative">
                                {e}

                                <button onClick={() => removeSubject(index)}>
                                    X
                                </button >
                            </span>
                        )}
                    </div>

                    <button
                        disabled={subjects.length === 0 ? true : false}
                        type="submit"
                        className={`btn-save ${subjects.length === 3 && 'bg-[#2B2D31]'}`}
                    >
                        Criar
                    </button>
                </form>
            </DialogContent>
        </Dialog >
    )
}