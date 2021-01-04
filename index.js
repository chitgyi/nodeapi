const bodyParser = require("body-parser");
const express = require("express")
const app = express();
require('dotenv').config();
const connection = require("./src/database/connection");
const v1 = require("./src/routes/api/v1")

connection.connect((err) => {
    if (err) {
        console.log(`[CONNECTION FAILED] ${err}`);
    } else {
        console.log("CONNECTION SUCCESS");
    }
});

app.use(bodyParser.json());

app.use("/api/v1", v1)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App is running at ${PORT}`));
