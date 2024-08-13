import express from "express";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

const port = process.env.PORT || 3000;
const { Client } = pg
const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
  })

await client.connect()
 



app.get("/test", (req,res) => {
    res.send({"test": 123});
    //const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    //console.log(res.rows[0].message) // Hello world!
    //await client.end() You use this to close the connection to the database
})


app.listen(port, () => {
    console.log(`Server live on port ${port}`)
  })