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
 
app.get("/api/data/period/all", async (req, res, next) => { // This will be the route that is called when the page is first opened. It will display that last total income and total expense entered into the app
  
  try {
    const resIncome = await client.query('SELECT * FROM income ORDER BY id DESC LIMIT 1;');
    const resExpense = await client.query('SELECT * FROM expense ORDER BY id DESC LIMIT 1;');
    const resInc = resIncome.rows;
    const resExp = resExpense.rows;
    res.json({resInc, resExp});
    console.log(resInc)
    console.log(resExp)
  } catch (err){
    next(err)
    console.log("An Error has occured", err);
  }
  })  

  app.get("/api/data/period/month", async (req, res, next) => { // This route will be to show data for the entire month
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    try {
      const resIncome = await client.query('SELECT (total_income) FROM income WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2;', [currentYear, currentMonth])
      const resExpense = await client.query('SELECT (total_expense) FROM expense WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2;', [currentYear, currentMonth])
      const resInc = resIncome.rows.map((item) => {
        return (
            {name: "Total Income", value: Number(item.total_income)
            }
        )
      })
      const resExp = resExpense.rows.map((item) => {
        return (
            {name: "Total Expense", value: Number(item.total_expense)
            }
        )
      });
      res.json({resInc, resExp});
    } catch (err){
      next(err)
      console.log("An Error has occured", err);
    }
    }) 

    app.get("/api/data/period/month/table", async (req, res, next) => { // This route will be to show data for the entire month on table
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      try {
        const resIncome = await client.query('SELECT * FROM income WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2;', [currentYear, currentMonth])
        const resExpense = await client.query('SELECT * FROM expense WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2;', [currentYear, currentMonth])
        const resInc = resIncome.rows.map((item) => {
          return (
              {date: item.date, type: "Income", value: Number(item.total_income)
              }
          )
        })
        const resExp = resExpense.rows.map((item) => {
          return (
              {date: item.date, type: "Expense", value: Number(item.total_expense)
              }
          )
        });
        res.json({resInc, resExp});
      } catch (err){
        next(err)
        console.log("An Error has occured", err);
      }
      }) 

app.post("/api/data/income", async (req, res, next) => { // This will be the add income route
  const request = req.body;
  console.log(request);
  try {
    const response = await client.query('INSERT INTO income (date, job_income, side_hustle_income, stock_income, other, total_income) VALUES ($1, $2, $3, $4, $5, $6)', [request.date, request.jobincome.replace(/[\$,]/g, ''), request.sidehustleincome.replace(/[\$,]/g, ''), request.stockincome.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.totalincome.replace(/[\$,]/g, '')]);
    res.sendStatus(200);
    console.log("Income has been added into the database");
  } catch (err){
    next(err)
    console.log("An Error has occured", err);
  }
  })  

app.post("/api/data/expense", async (req, res, next) => { // This will be the expense route
  const request = req.body;
  console.log(request);
  try {
    const response = await client.query('INSERT INTO expense (date, housing, food, transportation, insurance, entertainment, other, total_expense) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [request.date, request.housing.replace(/[\$,]/g, ''), request.food.replace(/[\$,]/g, ''), request.transportation.replace(/[\$,]/g, ''), request.insurance.replace(/[\$,]/g, ''), request.entertainment.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.totalexpense.replace(/[\$,]/g, '')]);
    res.sendStatus(200);
    console.log("Expenses has been added into the database");
  } catch (err){
    next(err)
    console.log("An Error has occured", err);
  }
  })  

  app.post("/api/data/income/period", async (req, res, next) => {   // this route returns the data from income lookup
    const request = req.body;
    console.log(request);
    try {
      const response = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
      console.log("Database has looked up the 2 dates");
      console.log("Data returned from database");
      console.log(response.rows);
      const resInc = response.rows.map((item) => {
        return ({
          name: "Total Income", value: Number(item.total_income) 
        })
      })
      res.json(resInc);
    } catch (err){
      next(err)
      console.log("An Error has occured", err);
    }
    }) 

    app.post("/api/data/income/period/table", async (req, res, next) => {   // this route returns the data from income lookup for table data
      const request = req.body;
      console.log(request);
      try {
        const response = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
        console.log("Database has looked up the 2 dates");
        console.log("Data returned from database");
        console.log(response.rows);
        const resInc = response.rows;
        res.json(resInc);
      } catch (err){
        next(err)
        console.log("An Error has occured", err);
      }
      }) 

  app.post("/api/data/expense/period", async (req, res, next) => { // this route returns the data from expense lookup
    const request = req.body;
    console.log(request);
    try {
      const response = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
      console.log("Database has looked up the 2 dates");
      console.log("Data returned from database");
      console.log(response.rows);
      const resExp = response.rows.map((item) => {
        return ({
          name: "Total Expense", value: Number(item.total_expense) 
        })
      })
      res.json(resExp);    
    } catch (err){
      next(err)
      console.log("An Error has occured", err);
    }
    }) 

    app.post("/api/data/expense/period/table", async (req, res, next) => { // this route returns the data from expense lookup for table data
      const request = req.body;
      console.log(request);
      try {
        const response = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
        console.log("Database has looked up the 2 dates");
        console.log("Data returned from database");
        console.log(response.rows);
        const resExp = response.rows;
        res.json(resExp);    
      } catch (err){
        next(err)
        console.log("An Error has occured", err);
      }
      }) 

    app.post("/api/data/income-expense/period", async (req, res, next) => { // this route returns the data from income, and expense lookup
      const request = req.body;
      console.log(request);
      try {
        const resIncome = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
        const resExpense = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
        console.log(resIncome.rows)
        console.log(resExpense.rows)
        const resInc = resIncome.rows.map((item) => {
          return ({
            name: "Total Income", value: Number(item.total_income) 
          })
        })
        const resExp = resExpense.rows.map((item) => {
          return ({
            name: "Total Expense", value: Number(item.total_expense) 
          })
        })
        res.json({resInc, resExp});   
      } catch (err){
        next(err)
        console.log("An Error has occured", err);
      }
      }) 

      app.post("/api/data/income-expense/period/table", async (req, res, next) => { // this route returns the data from income, and expense lookup to table
        const request = req.body;
        console.log(request);
        try {
          const resIncome = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
          const resExpense = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
          console.log(resIncome.rows)
          console.log(resExpense.rows)
          const resInc = resIncome.rows;
          const resExp = resExpense.rows;
          res.json({resInc, resExp});   
        } catch (err){
          next(err)
          console.log("An Error has occured", err);
        }
        }) 

      app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    });

app.listen(port, () => {
    console.log(`Server live on port ${port}`)
  })