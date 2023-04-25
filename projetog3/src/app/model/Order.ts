import { Usuario } from "./usuario";

export interface Order {
    id?: number;
    totalPrice?: String;
    status?: String;
    user?: Usuario[];
}