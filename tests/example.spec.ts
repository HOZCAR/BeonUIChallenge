import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Search store' }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Search store' }).fill("Apple Macbook Pro");
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForURL(/search\?q=Apple\+Macbook\+Pro.*/);
  await page.locator('.item-grid').filter({ hasText: 'Apple MacBook Pro' }).waitFor({ state: 'visible' });
  const product = page.locator('.item-grid').filter({ hasText: 'Apple MacBook Pro' });
  await product.getByRole('link', { name: 'Apple MacBook Pro', exact: true }).waitFor({ state: 'visible' });
  await product.getByRole('link', { name: 'Apple MacBook Pro', exact: true }).click();
  await page.getByRole('button', { name: 'Add to cart' }).first().waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByText('The product has been added to your shopping cart').waitFor({ state: 'visible' });
  const confirmationMessage = await page.getByText('The product has been added to your shopping cart').innerText();
  expect.soft(confirmationMessage).toBe('The product has been added to your shopping cart');
  await page.goto('/cart');
  await page.getByRole('link', { name: 'Apple MacBook Pro', exact: true }).waitFor({ state: 'visible' });
  const cartItem = await page.getByRole('link', { name: 'Apple MacBook Pro', exact: true }).innerText();
  expect(cartItem).toBe('Apple MacBook Pro');
});