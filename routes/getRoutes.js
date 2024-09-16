import express from "express";
import client from "../server.js";

const router = express.Router();


router.get("/api/data/period/all", async (req, res, next) => { // This will be the route that is called when the page is first opened. It will display that last total income and total expense entered into the app
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
    });  
  
    router.get("/api/data/period/month", async (req, res, next) => { // This route will be to show data for the entire month
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
      }); 
  
      router.get("/api/data/period/month/table", async (req, res, next) => { // This route will be to show data for the entire month on table
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        try {
          const resIncome = await client.query('SELECT * FROM income WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2;', [currentYear, currentMonth])
          const resExpense = await client.query('SELECT * FROM expense WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2;', [currentYear, currentMonth])
          const resInc = resIncome.rows.map((item) => {
            return (
                {id:item.id, date: item.date, type: "Income", value: Number(item.total_income)
                }
            )
          })
          const resExp = resExpense.rows.map((item) => {
            return (
                {id:item.id, date: item.date, type: "Expense", value: Number(item.total_expense)
                }
            )
          });
          res.json({resInc, resExp});
        } catch (err){
          next(err)
          console.log("An Error has occured", err);
        }
        });

      router.get("/api/data/income/:id", async (req, res, next) => {
        let id = req.params.id
        console.log(id);
        try {
          const resIncome = await client.query('SELECT * FROM income WHERE id = $1', [id]);
          const resInc = resIncome.rows;
          res.json({resInc});
        } catch (err) {
          next(err)
          console.log("An Error has occured", err);
        }
      })

      router.get("/api/data/expense/:id", async (req, res, next) => {
        let id = req.params.id
        console.log(id);
        try {
          const resExpense = await client.query('SELECT * FROM expense WHERE id = $1', [id]);
          const resExp = resExpense.rows;
          res.json({resExp});
        } catch (err) {
          next(err)
          console.log("An Error has occured", err);
        }
      })

export default router;