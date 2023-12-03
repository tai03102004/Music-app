import express, { Express} from "express";
import * as database from "./config/database";
import dotenv from "dotenv";

import clientRoutes from "./routes/client/index.route";

dotenv.config();
database.connect(); // Kết nối database


const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Pug

app.set("views","./views");
app.set('view engine', 'pug');

// End pug

// Public
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Client Routes
clientRoutes(app);


app.listen (port ,()  => {
    console.log(`App listening on port ${port}`);
});