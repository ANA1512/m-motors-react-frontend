import { test, expect } from '@playwright/test'

test('login réussi', async ({ page }) => {
  await page.goto('http://localhost:5173/login')

  await page.fill('input[name="email"]', 'test234@gmail.com')
  await page.fill('input[name="password"]', '98765')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('http://localhost:5173/moncompte')
})

test('login échoué - mauvais mot de passe', async ({ page }) => {
  await page.goto('http://localhost:5173/login')

  await page.fill('input[name="email"]', 'test234@gmail.com')
  await page.fill('input[name="password"]', 'mauvaismdp')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('http://localhost:5173/login')
})