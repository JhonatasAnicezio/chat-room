import { Room } from "@/types/Room";
import { roomApi } from "../api";
import { AxiosError, AxiosResponse } from "axios";
import { CreateRoomSchema } from "@/components/app/home/rooms/dialog-create-room/create-room-schema";

export async function findAllRooms() {
    try {
        const { data }: AxiosResponse<Room[]> = await roomApi.get('/');

        return data;
    } catch (error) {
        return null;
    }
}

export async function createRoom({ name, subjects, idAuthor }: CreateRoomSchema, token: string) {
    try {
        const { data }: AxiosResponse<Room> = await roomApi.post('/', { name, subjects, idAuthor }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data;
    } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
            const message = error.response?.data.message;
            throw new Error(message);
        }
    }
}

export async function findById(id: string, token: string) {
    try {
        const { data }: AxiosResponse<Room> = await roomApi.get(`/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data;
    } catch (error) {
        return null;
    }
}

export async function deleteRoom(id: string, token: string) {
    try {
        const { data }: AxiosResponse<Room> = await roomApi.delete(`/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data;
    } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
            const message = error.response?.data.message;
            console.log(message);
            throw new Error(message);
        }
    }
}
