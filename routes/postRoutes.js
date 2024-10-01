import express from "express";
import client from "../server.js";

const router = express.Router();

router.post("/api/data/income", async (req, res, next) => { // This will be the add income route
    const request = req.body;
    try {
      const response = await client.query('INSERT INTO income (date, job_income, side_hustle_income, stock_income, other, total_income) VALUES ($1, $2, $3, $4, $5, $6)', [request.date, request.jobincome.replace(/[\$,]/g, ''), request.sidehustleincome.replace(/[\$,]/g, ''), request.stockincome.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.totalincome.replace(/[\$,]/g, '')]);
      res.sendStatus(200);
    } catch (err){
      next(err)
      console.log("An Error has occured", err);
    }
    });  
  
    router.post("/api/data/expense", async (req, res, next) => { // This will be the expense route
    const request = req.body;
    try {
      const response = await client.query('INSERT INTO expense (date, housing, food, transportation, insurance, entertainment, other, total_expense) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [request.date, request.housing.replace(/[\$,]/g, ''), request.food.replace(/[\$,]/g, ''), request.transportation.replace(/[\$,]/g, ''), request.insurance.replace(/[\$,]/g, ''), request.entertainment.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.totalexpense.replace(/[\$,]/g, '')]);
      res.sendStatus(200);
    } catch (err){
      next(err)
      console.log("An Error has occured", err);
    }
    });  
  
    router.post("/api/data/income/period", async (req, res, next) => {   // this route returns the data from income lookup
      const request = req.body;
      try {
        const response = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
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
      });
      
      router.post("/api/data/income/period/table", async (req, res, next) => {   // this route returns the data from income table
        const request = req.body;
        try {
          const response = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
          res.json(response.rows);
        } catch (err){
          next(err)
          console.log("An Error has occured", err);
        }
        });
  
      router.post("/api/data/expense/period", async (req, res, next) => { // this route returns the data from expense lookup
      const request = req.body;
      try {
        const response = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
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
      }); 
  
      router.post("/api/data/expense/period/table", async (req, res, next) => {   // this route returns the data for expense table
        const request = req.body;
        try {
          const response = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
          res.json(response.rows);
        } catch (err){
          next(err)
          console.log("An Error has occured", err);
        }
        });
  
        router.post("/api/data/income-expense/period", async (req, res, next) => { // this route returns the data from income, and expense lookup
        const request = req.body;
        try {
          const resIncome = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
          const resExpense = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
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
        });
  
        router.post("/api/data/income-expense/period/table", async (req, res, next) => { // this route returns the data from income, and expense for table
          const request = req.body;
          try {
            const resIncome = await client.query('SELECT * FROM income WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
            const resExpense = await client.query('SELECT * FROM expense WHERE date >= $1 AND date < $2', [request.firstdate, request.seconddate]);    
            const resInc = resIncome.rows;
            const resExp = resExpense.rows;
            res.json({resInc, resExp});   
          } catch (err){
            next(err)
            console.log("An Error has occured", err);
          }
          }); 
export default router;