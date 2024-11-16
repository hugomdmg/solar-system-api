const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const path = require('path');


const corsOptions = {
    // origin: 'https://solar-system-explore.vercel.app',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type'
};

let ships = []
let shots = []

setInterval(() => {
    shots.forEach((shot) => {
        shot.position.x = shot.position.x + (shot.velocity.x || 0)
        shot.position.y = shot.position.y + (shot.velocity.y || 0)
        shot.position.z = shot.position.z + (shot.velocity.z || 0)
    })
    if (shots.length > 5) {
        shots.splice(0, shots.length - 5);
    }
}, 30)

setInterval(() => {
    ships = []
}, 3000);

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { res.send({ value: 'solar system api' }) })
app.get('/shots-data', (req, res) => { res.send({ value: shots }) })

app.post('/ships', (req, res) => {
    let inThelist = false
    ships.map((ship, index) => {
        if (req.body.userId == ship.userId) {
            ships[index] = req.body
            inThelist = true
        }
    })
    if (!inThelist) {
        ships.push(req.body)
    }
    res.send({ value: ships })
})

app.post('/shots', (req, res) => {
    if (req.body != null) {
        let inThelist = false
        shots.map((shot, index) => {
            if (req.body.id == shot.id) {
                shots[index] = req.body
                inThelist = true
            }
        })
        if (!inThelist) {
            shots.push(req.body)
        }
    }
    res.send({ value: shots });
});

app.listen(port, () => { console.log(`Server: http://localhost:${port}`) })