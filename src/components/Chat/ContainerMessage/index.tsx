import { Message } from "@/types/Message";
import { IoPersonCircle } from "react-icons/io5";
import './index.css';
import Image from "next/image";

export default function ContainerMessage({ author, createAt, id, text, photoAuthorURL }: Message) {
    return (
        <div className="container-message" id={id}>
            <div className="icon">
                {photoAuthorURL ?
                    <Image
                        className="w-full h-full rounded-full"
                        src={photoAuthorURL}
                        alt="Preview da Imagem"
                        fill
                    />
                    :
                    <IoPersonCircle className="svg" />
                }
            </div>
            <div className="body">
                <div>
                    <h3 className="container-author">
                        <span className="author">{author}</span>
                        <span className="date">{`${createAt}`}</span>
                    </h3>
                </div>
                <div>
                    <p className="text-message">
                        {text}
                    </p>
                </div>

            </div>
        </div>
    )
}