import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";
import getRoutes from "./routes/getRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import patchRoutes from "./routes/patchRoutes.js";
import deleteRoutes from "./routes/deleteRoutes.js";

const app = express();

app.use(bodyParser.json());

dotenv.config();

app.use(cors()); //enables cors for all requests

const port = process.env.PORT || 3000;
const { Client } = pg
const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
  });

await client.connect()
 
app.use(getRoutes);

app.use(postRoutes);

app.use(patchRoutes);

app.use(deleteRoutes);

app.listen(port, () => {
    console.log(`Server live on port ${port}`)
  });

  export default client;