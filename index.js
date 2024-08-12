const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("App Is Running At http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB ERROR:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksArray = `SELECT * FROM book ORDER BY book_id`;
  const booksArray = await db.all(getBooksArray);
  response.send(booksArray);
});
