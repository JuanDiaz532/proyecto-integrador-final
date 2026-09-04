const mockExecute = jest.fn();

jest.mock('mysql2/promise', () => ({
  createPool: jest.fn(() => ({ execute: mockExecute }))
}));

const request = require('supertest');
const app = require('./app');

describe('API de Cursos', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  test('GET /api/cursos devuelve la lista de cursos', async () => {
    mockExecute.mockResolvedValueOnce([[{ id_curso: 1, nombre: 'React', cupo_maximo: 12 }]]);

    const res = await request(app).get('/api/cursos');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('POST /api/cursos rechaza un curso sin nombre', async () => {
    const res = await request(app).post('/api/cursos').send({ cupo_maximo: 10 });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/nombre/i);
  });

  test('POST /api/cursos rechaza un cupo invalido', async () => {
    const res = await request(app).post('/api/cursos').send({ nombre: 'Curso Test', cupo_maximo: -5 });
    expect(res.status).toBe(400);
  });

  test('POST /api/cursos crea un curso valido', async () => {
    mockExecute.mockResolvedValueOnce([{ insertId: 99 }]);

    const res = await request(app).post('/api/cursos').send({ nombre: 'Curso Nuevo', cupo_maximo: 20 });
    expect(res.status).toBe(201);
    expect(res.body.data.id_curso).toBe(99);
  });
});