import express, { Express} from "express";
import * as database from "./config/database";
import dotenv from "dotenv";

import clientRoutes from "./routes/client/index.route";
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
database.connect(); // Kết nối database


const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Sử dụng body-parser để parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Pug

app.set("views","./views");
app.set('view engine', 'pug');

// End pug

// Public
app.use(express.static("public"));



// Client Routes
clientRoutes(app);


app.listen (port ,()  => {
    console.log(`App listening on port ${port}`);
});