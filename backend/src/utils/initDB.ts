import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const initDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: parseInt(DB_PORT || "3306"),
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`📦 Base de datos '${DB_NAME}' verificada.`);

    const pool = mysql.createPool({
      host: DB_HOST,
      port: parseInt(DB_PORT || "3306"),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS proyectos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        docente VARCHAR(255),
        nombre_proyecto VARCHAR(255),
        num_integrantes VARCHAR(10),
        nombres_integrantes TEXT,
        disciplina VARCHAR(255),
        curso VARCHAR(255),
        ciclo VARCHAR(10),
        turno VARCHAR(50),
        archivo1 VARCHAR(255),
        archivo2 VARCHAR(255),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Conexión a MySQL exitosa y tabla lista.");
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
    process.exit(1);
  }
};

export default initDB;
