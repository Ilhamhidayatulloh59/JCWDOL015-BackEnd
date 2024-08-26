import { Request, Response } from "express";
import prisma from "../prisma";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export class AuthorController {
    async createAuthor(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body

            const existingAuthor = await prisma.author.findUnique({
                where: { email: email }
            })

            if (existingAuthor) throw "email has been used !"

            const salt = await genSalt(10)
            const hashPassword = await hash(password, salt)

            const author = await prisma.author.create({
                data: { name, email, password: hashPassword }
            })
            res.status(201).send({
                status: 'ok',
                msg: 'author created!',
                author
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async loginAuthor(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const existingAuthor = await prisma.author.findUnique({
                where: { email: email }
            })

            if (!existingAuthor) throw "author not found !"

            const isValidPass = await compare(password, existingAuthor.password)
            
            if (!isValidPass) throw "incorrect password !"

            const payload = { id: existingAuthor.id, role: existingAuthor.role }
            const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' })

            res.status(200).send({
                status: 'ok',
                msg: "login success !",
                token,
                author: existingAuthor
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getAuthor(req: Request, res: Response) {
        try {
            const authors = await prisma.author.findMany()
            res.status(200).send({
                status: 'ok',
                authors
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getAuthorId(req: Request, res: Response) {
        try {
            const author = await prisma.author.findUnique({ 
                where: { id: +req.params.id } 
            })
            if (!author) throw 'author not found!'
            res.status(200).send({
                status: 'ok',
                author
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }
}