const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

// ======= Middlewares =======

/**
 * Short: Enables our server to be reached from other domains
 * Long: https://stackoverflow.com/questions/46024363/what-does-app-usecors-do
 * */
app.use(cors());
/**
 * Short: This will parse incoming requests with JSON payloads
 * Long: https://www.geeksforgeeks.org/express-js-express-json-function/
 * */
app.use(express.json());

// ======= Routes =======

/** Create a treatment */
app.post("/treatments", async (req, res) => {
  try {
    const { treatment_information, date, worker_email, car_number } = req.body;
    const newTreatment = await pool.query(
      "INSERT INTO treatments (treatment_information,date ,worker_email ,car_number) VALUES($1, $2, $3, $4) RETURNING *",
      [treatment_information, date, worker_email, car_number]
    );

    res.json(newTreatment.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
/** Retrieve all treatments */
app.get("/treatments", async (req, res) => {
  try {
    const allTreatments = await pool.query("SELECT * FROM treatments");

    res.json(allTreatments.rows);
  } catch (error) {
    console.error(error.message);
  }
});
/** Retrieve a treatment */
app.get("/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const treatment = await pool.query(
      "SELECT * FROM treatments WHERE treatment_number = $1",
      [id]
    );
    res.json(treatment.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
/** Update a treatment */
app.put("/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { treatment_information, date, worker_email, car_number } = req.body;

    const updatedTreatment = await pool.query(
      "UPDATE treatments SET treatment_information = $1, date = $2, worker_email = $3, car_number = $4 WHERE treatment_number = $5 RETURNING *",
      [treatment_information, date, worker_email, car_number, id]
    );

    res.json(updatedTreatment.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
/** Delete a treatment */
app.delete("/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM treatments WHERE treatment_number = $1", [id]);

    res.json(`Treatments id=${id} was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// ======= Server =======

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is up on port ${process.env.PORT}`);
});
