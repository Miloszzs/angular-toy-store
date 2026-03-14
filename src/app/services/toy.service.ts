import axios from "axios";
import { Toy } from "../../models/toy.model";

const client = axios.create({
    baseURL: 'https://toy.pequla.com/api',
    headers: {
        'Accept' : 'application/json',
        'X-Name' : 'KVA_2026_projekat/v1.0'
    },
    validateStatus(status) {
        return status === 200
    },
})

export class ToyService {
    static async getAllToys() {
        return await client.get<Toy[]>('/toy')
    }
    static async getToyType() {
        return await client.get<string[]>('/type')
    }
    
}