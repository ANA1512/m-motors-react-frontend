import { test, expect } from '@playwright/test'

test('register réussi', async ({ page }) => {
  await page.goto('http://localhost:5173/register')

  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', `test${Date.now()}@gmail.com`)
  await page.fill('input[name="password"]', 'password123')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('http://localhost:5173/login')
})

test('register échoué - email déjà utilisé', async ({ page }) => {
  await page.goto('http://localhost:5173/register')

  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test234@gmail.com')
  await page.fill('input[name="password"]', 'password123')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('http://localhost:5173/register')
})