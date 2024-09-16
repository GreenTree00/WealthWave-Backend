import express from "express";
import client from "../server.js";

const router = express.Router();

router.patch("/api/data/income/:id", async (req, res, next) => {         // this route will update the income 
    let request = req.body;
    let id = req.params.id;
    console.log(id);
    try {
        const resIncome = await client.query('INSERT INTO income WHERE id = $1 (date, job_income, side_hustle_income, stock_income, other, total_income) VALUES ($2, $3, $4, $5, $6, $7) ', [id, request.date, request.jobincome.replace(/[\$,]/g, ''), request.sidehustleincome.replace(/[\$,]/g, ''), request.stockincome.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.totalincome.replace(/[\$,]/g, '')]);
        const resExp = resExpense.rows;
        res.json({resExp});
      } catch (err) {
        next(err)
        console.log("An Error has occured", err);
      }
});

router.patch("/api/data/expense/:id", async (req, res, next) => {         // this route will update the expense
    let request = req.body;
    let id = req.params.id
    console.log(id);
    try {
        const resExpense = await client.query('INSERT INTO expense WHERE id = $1 (date, housing, food, transportation, insurance, entertainment, other, total_expense) VALUES ($2, $3, $4, $5, $6, $7, $8, $9)', [id, request.date, request.housing.replace(/[\$,]/g, ''), request.food.replace(/[\$,]/g, ''), request.transportation.replace(/[\$,]/g, ''), request.insurance.replace(/[\$,]/g, ''), request.entertainment.replace(/[\$,]/g, ''), request.other.replace(/[\$,]/g, ''), request.totalexpense.replace(/[\$,]/g, '')]);
        const resExp = resExpense.rows;
        res.json({resExp});
      } catch (err) {
        next(err)
        console.log("An Error has occured", err);
      }
});

export default router;