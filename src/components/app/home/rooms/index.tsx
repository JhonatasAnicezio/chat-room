import { findAllRooms } from "@/service/rooms";
import Link from "next/link";
import './index.css';
import Image from "next/image";

export default async function Rooms() {
    const rooms = await findAllRooms();

    return (
        <>
            {rooms && rooms.map((room) => (
                <Link key={room._id} href={`/chat/${room._id}`} className="div-room">
                    <div className="banner-cover">
                        {room.imgUrl &&
                            <Image
                                className="w-full h-full"
                                src={room.imgUrl}
                                alt="Preview da Imagem"
                                fill
                            />
                        }
                    </div >

                    <h2>{room.name}</h2>

                    <div className="div-subject">
                        {room.subjects.map((e, index) => (
                            <span key={index}>{e}</span>
                        ))}
                    </div>
                </Link>
            ))}
        </>
    )
}