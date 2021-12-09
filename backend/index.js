const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors('http://localhost:3000'))

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))


const port = 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})