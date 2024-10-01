import express from "express";
import client from "../server.js";


const router = express.Router();

router.delete("/api/data/income/delete/:id", async (req, res, next) => {         // this route will delete data from the income table
    let id = req.params.id;
        try {
          const deleteId = await client.query('DELETE FROM income WHERE id=$1', [id]);
          res.send("Deleted Income")
        } catch {
          next(err)
          console.log("An Error has occured", err);
        }
});

router.delete("/api/data/expense/delete/:id", async (req, res, next) => {         // this route will delete data from the expense table
  let id = req.params.id;
        try {
          const deleteId = await client.query('DELETE FROM expense WHERE id=$1', [id]);
          res.send("Deleted Expense")
        } catch {
          next(err)
          console.log("An Error has occured", err);
        }
});

export default router;