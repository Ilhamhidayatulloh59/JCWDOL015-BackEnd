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

export const createExpenseV2 = (req: Request, res: Response) => {
    const { title, type, category, nominal, date } = req.body
    db.query(`INSERT INTO expense(title, type, category, nominal, date)
    VALUES
        ('${title}', '${type}', '${category}', ${nominal}, '${date}')
    `, (err: QueryError) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        return res.status(201).send({
            status: 'ok',
            msg: 'Expense created!'
        })
    })
}

export const updateExpenseV2 = (req: Request, res: Response) => {
    // UPDATE expense SET title = "Beli Batagor", nominal = 15000, date = "2024-08-2" WHERE id = 2;
    const query: string[] = []
    for (let key in req.body) {
        query.push(`${key} = "${req.body[key]}"`)
    }
    
    db.query(`
        UPDATE expense SET ${query.join(', ')} WHERE id = ${req.params.id}
    `, (err: QueryError) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        res.status(200).send({
            status: 'ok',
            msg: 'expense updated'
        })
    })
}

export const deleteExpenseV2 = (req: Request, res: Response) => {
    db.query(`
        DELETE FROM expense WHERE id = ${req.params.id}
    `, (err: QueryError) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        res.status(200).send({
            status: 'ok',
            msg: 'expense deleted'
        })
    })
}