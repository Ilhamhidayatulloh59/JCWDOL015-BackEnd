import { Router } from "express";
import { getExpenseIdV2, getExpenseV2 } from "../controllers/expenseV2Controller";

const expenseRouterV2 = Router()

expenseRouterV2.get('/', getExpenseV2)
expenseRouterV2.get('/:id', getExpenseIdV2)

export { expenseRouterV2 }