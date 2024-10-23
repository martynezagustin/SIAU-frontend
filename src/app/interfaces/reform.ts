import { Piece } from "./piece";

export interface Reform{
    _id: string,
    description: string,
    date: string,
    amount: number,
    repairNumber: number,
    ticketNumber: number,
    pieces: Piece[]
}