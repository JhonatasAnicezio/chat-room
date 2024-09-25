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
import { useContext } from "react";
import { UserContext } from "@/context/User/user-context";
import { useForm } from "react-hook-form";
import { editProfileSchema, EditProfileSchema } from "./edit-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export function DialogEdit() {
    const { user, updateName } = useContext(UserContext);

    const router = useRouter();

    const {
        register,
        handleSubmit,
    } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
    });

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
                    onSubmit={handleSubmit(({ displayName }) => {
                        updateName(displayName);
                        router.push('/');
                    })}
                    className="form-content-dialog"
                >
                    <div>
                        <label htmlFor="name">
                            NOME EXIBIDO
                        </label>
                        <input
                            {...register('displayName')}
                            maxLength={20}
                            defaultValue={user ? user.displayName : ''}
                            id="display-name"
                        />
                    </div>

                    <button type="submit" className="btn-save">Salvar</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
