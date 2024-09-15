const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./router/thisRoute");
const run = require("./db/dbConnection");

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());


app.use("/api", router);


run(MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Server is runnig on ${PORT}!`);
});