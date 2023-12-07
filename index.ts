import express, { Express} from "express";
import * as database from "./config/database";
import dotenv from "dotenv";

import path from 'path';
import methodOverride from "method-override";

import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";

import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import { systemConfig } from "./config/config";

dotenv.config();
database.connect(); // Kết nối database


const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method')) // để dùng path trong html

app.use(express.json()); 
// Pug

app.set("views",`${__dirname}/views`);
app.set('view engine', 'pug');

// để chỉnh nhiều fone(tinymce) phải nhúng path

app.use(
    '/tinymce', 
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

// End pug

// App local variavles
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Flash
app.use(cookieParser("LHNASDASDAD"));
app.use(
    session({
        secret: 'dinhtai', // Add a secret key here
        cookie: { maxAge: 60000 },
    })
);

app.use(flash());

// End Flash

// Public
app.use(express.static(`${__dirname}/"public"`));

// Client Routes
clientRoutes(app);

// Admin Routes
adminRoutes(app);


app.listen (port ,()  => {
    console.log(`App listening on port ${port}`);
});