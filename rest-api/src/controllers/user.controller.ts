import { Request, Response } from 'express'
import fs from 'fs'

interface IUser {
    id: number;
    name: string;
    email: string;
    age: number;
}

export const getUser = (req: Request, res: Response) => {
    const users: IUser[] = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'))

    res.status(200).send({
        status: "ok",
        users
    })
}
