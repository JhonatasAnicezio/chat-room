'use client'
import { useForm } from "react-hook-form"
import { registerProfileSchema, RegisterProfileSchema } from "./register-profile-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useState } from "react";
import { UserContext } from "@/context/User/user-context";
import { FaCloudArrowUp } from "react-icons/fa6";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/service/firebase";
import Image from "next/image";
import './index.css';

export default function DialogRegister() {
    const [preview, setPreview] = useState<string | null>(null);
    const { updateProfileAndUploadImage, user } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterProfileSchema>({
        resolver: zodResolver(registerProfileSchema),
    });

    const getImageWithInput = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        if (files) {
            setValue('image', files[0]);
            setPreview(URL.createObjectURL(files[0]));
        }
    }

    const submitProfile = async ({ displayName, image }: RegisterProfileSchema) => {
        if (!user) return;

        const storageRef = ref(storage, `profiles/${user.uid}/${image.name}`);

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
        <div className='container-register-profile'>
            <form onSubmit={handleSubmit(submitProfile)}>
                <h1>
                    Crie seu usuario
                </h1>

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

                <input
                    {...register('displayName')}
                    maxLength={20}
                    placeholder='Nome exibido'
                />
                {errors.displayName && <span>{errors.displayName.message}</span>}
                {errors.root && <span>{errors.root.message}</span>}

                <button type="submit">
                    Salvar
                </button>
            </form>
        </div>
    )
}