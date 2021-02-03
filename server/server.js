const express = require('express')
const app = express()
const cors = require('cors')
require("./db/mongoose")

app.use(express.json({extended:true}))
app.use(cors())

// PORT
const PORT = process.env.PORT || 4000


// App listening to the port
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))

// Marsupilamis routes
app.use('/api/marsupilamis',require('./routes/marsupilamis'))

