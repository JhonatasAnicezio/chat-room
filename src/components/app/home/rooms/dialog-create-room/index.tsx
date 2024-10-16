'use client'
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { createRoomSchema, CreateRoomSchema } from "./create-room-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { createRoom } from "@/service/rooms";
import './index.css';
import { UserContext } from "@/context/User/user-context";
import Cookies from 'js-cookie';
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/service/firebase";

export default function CreateRoom() {
    const [subjects, setSubjects] = useState<string[]>([]);
    const [valueInputSubject, setValueInputSubject] = useState<string>("");
    const [preview, setPreview] = useState<string | null>(null);

    const { user } = useContext(UserContext);

    const { register, setValue, handleSubmit, formState: { errors }, setError } = useForm<CreateRoomSchema>({
        resolver: zodResolver(createRoomSchema),
    });

    if (!user) {
        return null;
    }

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

    const getImageWithInput = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        if (files) {
            setValue('image', files[0]);
            setPreview(URL.createObjectURL(files[0]));
        }
    }

    const sendNewRoom = async ({ name, subjects, image }: CreateRoomSchema) => {
        const token = Cookies.get('token');

        const storageRef = ref(storage, `rooms/${image.name}`);

        if (token) {
            try {
                //upload image
                await uploadBytes(storageRef, image);

                //get image
                const url = await getDownloadURL(storageRef);

                console.log(url, 'teste')

                await createRoom({ name, subjects, idAuthor: user.uid, image: url }, token);

                window.location.reload();
            } catch (error: any) {
                setError('root', { message: error.message });
            }

        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-create">Criar Sala</button>
            </DialogTrigger>
            <DialogContent className="container-dialog bg-[#18181B]">
                <DialogHeader>
                    <DialogTitle>Criar sala de bate-papo</DialogTitle>
                    <DialogDescription>
                        Crie aqui sua sala de bate papo e converse sobre assuntos em comum com pessoas do mundo inteiro
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(sendNewRoom)}
                    className="form-create-room"
                >
                    <div className="div-create-room">
                        <label className="flex justify-center items-center w-full h-48 rounded-lg border" htmlFor="image">
                            {preview && (
                                <div className="absolute w-full h-full rounded-full">
                                    <Image
                                        className="w-full h-full"
                                        src={preview}
                                        alt="Preview da Imagem"
                                        fill
                                    />
                                </div>
                            )}
                            IMAGEM DA SALA
                        </label>
                        <input
                            id="image"
                            className="hidden"
                            onChange={getImageWithInput}
                            type="file"
                        />
                    </div>
                    {errors.image && typeof errors.image.message === "string" && (
                        <span className="text-red-500 text-xs">{errors.image.message}</span>
                    )}

                    <div className="div-create-room">
                        <label htmlFor="name">
                            NOME DA SALA
                        </label>
                        <input
                            {...register('name')}
                            maxLength={15}
                        />
                    </div>
                    {errors.name && <span className="span-error">{errors.name.message}</span>}


                    <div className="div-create-room">
                        <label htmlFor="subject">
                            ASSUNTOS
                        </label>
                        <input
                            disabled={subjects.length === 3 ? true : false}
                            onChange={({ target: { value } }) => setValueInputSubject(value)}
                            value={valueInputSubject}
                            placeholder="Adicione até 3 assuntos"
                            maxLength={15}
                        />
                        <button onClick={() => addSubject(valueInputSubject)} type="button">Adicionar</button>
                    </div>
                    {errors.subjects && <span className="span-error">{errors.subjects.message}</span>}
                    {errors.root && <span className="span-error">{errors.root.message}</span>}

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
                        className={`button-save ${subjects.length === 0 && 'opacity-50'}`}
                    >
                        Criar
                    </button>
                </form>
            </DialogContent>
        </Dialog >
    )
}