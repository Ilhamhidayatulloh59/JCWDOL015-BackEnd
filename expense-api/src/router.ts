import { Router } from "express";
import { expenseRouter } from "./routers/expenseRouter";

const router = Router()

router.use('/expenses', expenseRouter)

export default router