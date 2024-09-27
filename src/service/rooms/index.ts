import { Room } from "@/types/Room";
import { roomApi } from "../api";
import { AxiosResponse } from "axios";

export default async function findAllRooms() {
    try {
        const { data }: AxiosResponse<Room[]> = await roomApi.get('/');

        return data;
    } catch (error) {
        return null;
    }
}