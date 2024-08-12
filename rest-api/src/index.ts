import express, { Application, Request, Response } from 'express'
import router from './router'

const PORT: number = 8000

const app: Application = express()
app.use(express.json())

app.post('/api', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        msg: 'Welcome to my Api'
    })
})

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`[API] : http://localhost:${PORT}/api`)
})