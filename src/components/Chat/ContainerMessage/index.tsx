import { Message } from "@/types/Message";
import { IoPersonCircle } from "react-icons/io5";

import './index.css';

export default function ContainerMessage({ author, createAt, id, text }: Message) {
    return (
        <div className="container-message" id={id}>
            {/* icon */}
            <div className="icon">
                <IoPersonCircle className="svg" />
            </div>

            {/* body */}
            <div className="body">

                {/* author */}
                <div>
                    <h3 className="container-author">
                        {/* author */}
                        <span className="author">{ author }</span>

                        {/* date */}
                        <span className="date">{ `${createAt}` }</span>
                    </h3>
                </div>

                {/* text of message */}
                <div>
                    <p className="text-message">
                        {text}
                    </p>
                </div>

            </div>
        </div>
    )
}