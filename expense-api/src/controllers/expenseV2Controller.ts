import { Request, Response } from "express";
import db from "../config/db";
import { QueryError } from "mysql2";
import { IExpense } from "../type";

export const getExpenseV2 = (req: Request, res: Response) => {
    db.query("SELECT * FROM expense", (err: QueryError, result: IExpense[]) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        return res.status(200).send({
            status: 'ok',
            expense: result
        })
    })
}

export const getExpenseIdV2 = (req: Request, res: Response) => {
    db.query(`SELECT * FROM expense WHERE id = ${req.params.id}`, (err: QueryError, result: IExpense[]) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        return res.status(200).send({
            status: 'ok',
            expense: result
        })
    })
}