const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ value: 'hola mundo' })
})

let ships = []

setInterval(()=>{
    ships = []
}, 3000)

app.post('/ships', (req, res) => {

    let inThelist = false
    ships.map((ship, index) => {
        if (req.body.id == ship.id) {
            ships[index] = req.body
            inThelist = true
        }
    })
    if (!inThelist) {
        ships.push(req.body)
    }

    res.send({ value: ships })
})


app.listen(port, () => { console.log(`Server: http://localhost:${port}`) })