import findAllRooms from "@/service/rooms";
import Link from "next/link";

export default async function Rooms() {
    const rooms = await findAllRooms();

    return (
        <>
            {rooms && rooms.map((room) => (
                <Link key={room._id} href={`/chat/${room._id}`} className="div-room">
                    <div className=""></div>

                    <h2>{room.name}</h2>

                    <div className="">
                        {room.subject.map((e, index) => (
                            <span key={index}>{e}</span>
                        ))}
                    </div>
                </Link>
            ))}
        </>
    )
}