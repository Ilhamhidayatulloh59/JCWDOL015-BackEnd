import { Router } from "express";
import { createExpense, deleteExpense, editExpense, getExpense, getExpenseId } from "../controllers/expenseController";

const expenseRouter = Router()

expenseRouter.get('/', getExpense)
expenseRouter.get('/:id', getExpenseId)
expenseRouter.post('/', createExpense)
expenseRouter.patch('/:id', editExpense)
expenseRouter.delete('/:id', deleteExpense)

export { expenseRouter }