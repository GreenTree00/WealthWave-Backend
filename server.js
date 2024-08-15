import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

const app = express();

app.use(bodyParser.json())

dotenv.config();

app.use(cors()) //enables cors for all requests

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
 
app.post("/api/data", async (req,res) => { // This will be the main route to get current data for graphs
  })  

app.post("/api/data/income", async (req,res) => { // This will be the add income route
  const request = req.body;
  console.log(request);
  try {
    const res = await client.query('INSERT INTO income (date, total_income, side_hustle_income, stock_income, other) VALUES ($1, $2, $3, $4, $5)', [request.date, request.totalincome, request.sidehustleincome, request.stockincome, request.other]);
    console.log("Income has been added into the database");
  } catch (err){
    console.log("An Error has occured", err);
  }
  })  

app.post("/api/data/expense", async (req,res) => { // This will be the expense route
  const request = req.body;
  console.log(request);
  try {
    const res = await client.query('INSERT INTO expense (date, total_expense, housing, food, transportation, insurance, other) VALUES ($1, $2, $3, $4, $5, $6, $7)', [request.date, request.totalexpense, request.housing, request.food, request.transportation, request.insurance, request.other]);
    console.log("Expenses has been added into the database");
  } catch (err){
    console.log("An Error has occured", err);
  }
  })  

/*app.get("/test", async (req,res) => {         // Save this just to test if the database is down

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
}) */


app.listen(port, () => {
    console.log(`Server live on port ${port}`)
  })