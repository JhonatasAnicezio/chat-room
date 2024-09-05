import { Message } from "@/types/Message";
import { IoPersonCircle } from "react-icons/io5";

export default function ContainerMessage({ author, createAt, id, text }: Message) {
    return (
        <div className="container-message" id={id}>
            <div className="icon">
                <IoPersonCircle className="svg" />
            </div>
            <div className="body">
                <div>
                    <h3 className="container-author">
                        <span className="author">{ author }</span>
                        <span className="date">{ `${createAt}` }</span>
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