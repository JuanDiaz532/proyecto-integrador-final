import { test, expect } from '@playwright/test';
import path from 'path';

test('registrar un curso muestra mensaje de éxito', async ({ page }) => {
  const filePath = 'file://' + path.resolve(__dirname, '../index.html');
  await page.goto(filePath);

  await page.fill('#nombre', 'Curso E2E Playwright');
  await page.fill('#descripcion', 'Prueba automatizada de extremo a extremo');
  await page.fill('#cupo', '15');

  await page.click('#btnSubmit');

  await expect(page.locator('#status-message')).toContainText('guardado exitosamente');
});