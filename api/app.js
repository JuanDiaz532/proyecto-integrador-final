const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/api/cursos', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT
                id_curso,
                nombre,
                descripcion,
                cupo_maximo,
                activo
            FROM cursos
            ORDER BY id_curso;
        `);
        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

app.post('/api/cursos', async (req, res) => {
    try {
        const { nombre, descripcion, cupo_maximo } = req.body;
        if (!nombre || typeof nombre !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'El nombre del curso es obligatorio'
            });
        }
        if (cupo_maximo === undefined || !Number.isInteger(cupo_maximo) || cupo_maximo <= 0) {
            return res.status(400).json({
                success: false,
                error: 'cupo_maximo debe ser un entero mayor que 0'
            });
        }
        const [result] = await pool.execute(
            `INSERT INTO cursos (nombre, descripcion, cupo_maximo, activo) VALUES (?, ?, ?, TRUE)`,
            [nombre.trim(), descripcion || null, cupo_maximo]
        );
        res.status(201).json({
            success: true,
            message: 'Curso creado correctamente',
            data: {
                id_curso: result.insertId,
                nombre: nombre.trim(),
                descripcion: descripcion || null,
                cupo_maximo,
                activo: true
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Semana 3 funcionando'
    });
});

module.exports = app;