import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import './index.css';

export function DialogEdit() {
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
                <div className="div-content">
                    <div>
                        <label htmlFor="name">
                            NOME EXIBIDO
                        </label>
                        <input
                            id="display-name"
                        />
                    </div>
                    <div>
                        <label htmlFor="username">
                            TELEFONE
                        </label>
                        <input
                            id="phone"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <button type="submit" className="btn-save">Salvar</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
