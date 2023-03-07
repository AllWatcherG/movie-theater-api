const express = require("express");
const app = express();
const userRouter = require("./routes/users")
const showRouter = require("./routes/shows")
const port = 3000;


app.use(express.json())
app.use(express.urlencoded())

app.use('/users', userRouter)
app.use('/shows', showRouter)

app.listen(port, () => {
    console.log(`Your server is listening on port http://localhost:${port}/users`);
})