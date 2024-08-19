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
 
app.get("/api/data", async (req,res) => { // This will be the route that is called when the page is first opened. It will display that last total income and total expense entered into the app
  
  try {
    const resIncome = await client.query('SELECT * FROM income ORDER BY id DESC LIMIT 1;');
    const resExpense = await client.query('SELECT * FROM expense ORDER BY id DESC LIMIT 1;');
    const resInc = resIncome.rows;
    const resExp = resExpense.rows;
    res.json({resInc, resExp});
    console.log(resInc)
    console.log(resExp)
  } catch (err){
    console.log("An Error has occured", err);
  }
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

  app.post("/api/data/income/period", async (req,res) => { 
    const request = req.body;
    console.log(request);
    try {
      const response = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
      console.log("Database has looked up the 2 dates");
      console.log("Data returned from database");
      console.log(response.rows);
      res.json(response.rows);
    } catch (err){
      console.log("An Error has occured", err);
    }
    }) 

  app.post("/api/data/expense/period", async (req,res) => { 
    const request = req.body;
    console.log(request);
    try {
      const response = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
      console.log("Database has looked up the 2 dates");
      console.log("Data returned from database");
      console.log(res.rows);
      res.json(response.rows);
    } catch (err){
      console.log("An Error has occured", err);
    }
    }) 

    app.post("/api/data/income-expense/period", async (req,res) => { 
      const request = req.body;
      console.log(request);
      try {
        const resIncome = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
        const resExpense = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
        console.log(resIncome.rows);
        console.log(resExpense.rows);
        const resInc = resIncome.rows;
        const resExp = resExpense.rows;
        res.json({resInc, resExp});
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