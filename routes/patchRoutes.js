import express from "express";
import client from "../server.js";

const router = express.Router();

router.patch("/api/data/income/:id", async (req, res, next) => {         // this route will update the income 
    let request = req.body;
    let id = req.params.id;
    try {
        const resIncome = await client.query(`UPDATE income SET date = $2, job_income = $3, side_hustle_income = $4, stock_income = $5, other = $6, total_income = $7 WHERE id = $1`, [id, request.date, request.job_income.replace(/[\$,]/g, ''), request.side_hustle_income.replace(/[\$,]/g, ''), request.stock_income.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.total_income.replace(/[\$,]/g, '')]);
        const resInc = resIncome;
        res.json({resInc});
        console.log("Income is being updated");
      } catch (err) {
        next(err)
        console.log("An Error has occured", err);
      }
});

router.patch("/api/data/expense/:id", async (req, res, next) => {         // this route will update the expense
    let request = req.body;
    let id = req.params.id
    try {
        const resExpense = await client.query('UPDATE expense SET date = $2, housing = $3, food = $4, transportation = $5, insurance = $6, entertainment = $7, other = $8, total_expense = $9 WHERE id = $1;', [id, request.date, request.housing.replace(/[\$,]/g, ''), request.food.replace(/[\$,]/g, ''), request.transportation.replace(/[\$,]/g, ''), request.insurance.replace(/[\$,]/g, ''), request.entertainment.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.total_expense.replace(/[\$,]/g, '')]);
        const resExp = resExpense.rows;
        res.json({resExp});
        console.log("Expense if being updated");
      } catch (err) {
        next(err)
        console.log("An Error has occured", err);
      }
});

export default router;