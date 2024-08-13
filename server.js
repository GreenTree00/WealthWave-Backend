import express from "express";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
const { Client } = pg
const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
  })

await client.connect()
 



app.get("/test", async (req,res) => {

  try {
    const res = await client.query('SELECT * FROM testing WHERE id = $1', [1])
    const result = res.rows;
    console.log(result);
  } catch (err){
    console.log("An Error has occured", err);
  }
    
    //const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    //console.log(res.rows[0].message) // Hello world!
    //await client.end() You use this to close the connection to the database
})


app.listen(port, () => {
    console.log(`Server live on port ${port}`)
  })