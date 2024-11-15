const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
    // origin: 'https://solar-system-explore.vercel.app',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ value: 'solar system api' })
})

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
   if(req.body != null){
       let inThelist = false
       shots.map((shot, index) => {
           if (req.body.userId == shot.userId) {
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

app.get('/shots-data', (req, res) => {
    res.send({ value: shots })
})


app.listen(port, () => { console.log(`Server: http://localhost:${port}`) })