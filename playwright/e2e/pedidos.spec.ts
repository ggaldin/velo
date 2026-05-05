import { test, expect } from '@playwright/test';


// AAA - Arrange, Act, Assert   
test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  //Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  
  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //await page.getByTestId('search-order-id').fill('VLO-XH7WDG');
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-XH7WDG');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  //await page.locator('//button[text()="Buscar Pedido"]').click();

  //await page.waitForTimeout(10000); estrategia ruim pois espera sempre pelo tempo informado passar.

  //await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 30000 });  //estrategia boa pois espera até o tempo informado mas fica tentando e pode acabr antes.
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-XH7WDG');

  const pedidoBlock = page.locator('div').filter({ has: page.getByText(/^Pedido$/) }).first();
  await expect(pedidoBlock).toContainText('VLO-XH7WDG');

  //await expect(page.getByTestId('order-result-status')).toBeVisible();
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

  const resultadoCard = page.locator('div[role="main"], body').locator('section, div').filter({ hasText: 'Pedido' }).first();
  await expect(resultadoCard).toContainText('APROVADO');
});