import mysql from "mysql2";


import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers(email = null, password = null) {
  let query = "SELECT * FROM user";

  const storeEmailAndPassword = [];

  if (email) {
    storeEmailAndPassword.push("email = ?");
  }

  if (password) {
    storeEmailAndPassword.push("password = ?");
  }

  if (storeEmailAndPassword.length > 0) {
    query += " WHERE " + storeEmailAndPassword.join(" AND ");
  }

  const values = [email, password].filter(value => value !== null);

  console.log(query);

  const [rows] = await pool.query(query, values);
  return rows;
}


export async function getUser(id) {
  const [rows] = await pool.query(
    `SELECT *
        FROM user
        WHERE ID = ?
        `,
    [id]
  );

  return rows[0];
}

export async function register(fullname, email, password) {
  const [result] = await pool.query(
    `INSERT INTO user (fullname , email , password)
    VALUE (?,?,?)`,
    [fullname, email, password]
  );

  const id = result.insretId;
  return getUser(id);
}



