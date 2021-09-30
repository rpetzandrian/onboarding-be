const Sequelize = require("sequelize");
require("dotenv").config();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

// try {
//   await db.authenticate();
//   console.log("Connected to DB");
// } catch (err) {
//   console.error("Unable connect to Database", err);
// }

module.exports = db;
