const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./src/router/auth.js');
const usersRoute = require('./src/router/users.js');
const moviesRoute = require('./src/router/movies.js');
const listsRoute = require('./src/router/lists.js')
const cors = require('cors')

dotenv.config();


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB Connected")); 

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/lists", listsRoute);

app.listen(3001, () => {
    console.log("Listening on port 3001");
});

