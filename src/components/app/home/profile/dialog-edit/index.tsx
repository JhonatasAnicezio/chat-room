'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import './index.css';
import { useContext, useState } from "react";
import { UserContext } from "@/context/User/user-context";
import { useForm } from "react-hook-form";
import { editProfileSchema, EditProfileSchema } from "./edit-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/service/firebase";
import { FaCloudArrowUp } from "react-icons/fa6";
import Image from "next/image";

export function DialogEdit() {
    const { user, updateProfileAndUploadImage } = useContext(UserContext);

    const [preview, setPreview] = useState<string | null>(user?.photoURL || null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
    });

    const getImageWithInput = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        if (files) {
            setValue('image', files[0]);
            setPreview(URL.createObjectURL(files[0]));
        }
    }

    const submitProfile = async ({ displayName, image }: EditProfileSchema) => {
        if (!user) return;

        const storageRef = ref(storage, `rooms/${user.uid}/${image.name}`);

        try {
            //upload image
            await uploadBytes(storageRef, image);

            //get image
            const url = await getDownloadURL(storageRef);

            await updateProfileAndUploadImage(displayName, url)
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-edit">Edit Profile</button>
            </DialogTrigger>
            <DialogContent className="container-dialog">
                <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription>
                        Faça alterações em seu perfil aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(submitProfile)}
                    className="form-content-dialog"
                >
                    <label id="upload-image" className="upload-image">
                        <FaCloudArrowUp />
                        <p>Image do perfil</p>


                        <input id="upload-image" type="file" onChange={getImageWithInput} />
                        {preview && (
                            <div className="absolute w-full h-full rounded-full">
                                <Image
                                    className="rounded-full w-full h-full"
                                    src={preview}
                                    alt="Preview da Imagem"
                                    fill
                                />
                            </div>
                        )}
                    </label>
                    {errors.image && typeof errors.image.message === "string" && (
                        <span className="text-red-500 text-xs">{errors.image.message}</span>
                    )}

                    <div>
                        <label htmlFor="name">
                            NOME EXIBIDO
                        </label>
                        <input
                            {...register('displayName')}
                            maxLength={20}
                            defaultValue={user ? user.name : ''}
                            id="display-name"
                        />
                    </div>

                    <button type="submit" className="btn-save">Salvar</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
