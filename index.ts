import express, { Express, Request, Response } from 'express';
import env from "dotenv";
env.config();

import { connect } from './config/database';
import routerApiV1 from './v1/routes/index.route';
import bodyParser  from 'body-parser';
import cors from "cors"
connect()


const app: Express = express();
const port: (number | string) = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json())

routerApiV1(app)

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})