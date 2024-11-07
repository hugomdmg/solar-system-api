import express, { urlencoded, json } from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

app.get('/', (req, res) => {
    res.send({ value: 'hello world' })
})


app.listen(port, () => { console.log(`Server: http://localhost:${port}`) })