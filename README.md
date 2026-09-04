# Proyecto Integrador Final — Ruta de Iniciación Fullstack Jr.

Aplicacion Fullstack sencilla de gestion de cursos, desarrollada como cierre de las
cuatro semanas de la ruta de iniciacion. Integra base de datos relacional, una API
propia, un frontend accesible y responsivo, y pruebas automatizadas.

## Tecnologias
- Node.js + Express (API)
- MySQL (base de datos relacional)
- HTML, CSS y JavaScript (frontend)
- Jest + Supertest (pruebas unitarias con mock)
- Playwright (pruebas end-to-end)
- Postman (pruebas de API)

## Estructura del proyecto
- `index.html` — Frontend accesible y responsivo (formulario + catalogo de cursos)
- `api/` — Backend con los endpoints GET y POST
- `api/cursos.test.js` — Pruebas unitarias con mock de base de datos
- `tests/cursos.spec.ts` — Prueba end-to-end con Playwright
- `Semana3.postman_collection.json` — Coleccion de pruebas de Postman

## Como ejecutarlo
1. Configura un archivo `.env` dentro de `api/` con tus credenciales de MySQL.
2. Instala dependencias: `npm install` en la raiz y dentro de `api/`.
3. Levanta el servidor: `node api/server.js`
4. Abre `index.html` en el navegador.

## Pruebas
- Unitarias: `cd api && npx jest`
- End-to-end: `npx playwright test`

## Autor
Juan Luis Diaz - JuanDiaz532
